require('dotenv').config();
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2/promise');
let express = require('express');
const helpers = require("./helpers/helpers");
const githubHelpers = require("./github/githubHelpers");
const upload = require("./storage/storage");
const middleware = require("./middleware/middleware")
const databaseMiddleware = require("./middleware/databaseMiddleware");
const performances = require("./resourceIntegration/performances");
const users = require("./resourceIntegration/users");
const constants = require("./constants");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { createClient } = require('@supabase/supabase-js')

let port = 4040;
let app = express();
let pool;

app.use(middleware.setCorsHeaders);
app.use(cors(middleware.corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/media', express.static(path.join(__dirname, '..', 'svgs')));

app.use(middleware.verifyApiKey);

app.get('/protected', (req, res) => {
  res.json({ message: `Hello! You have access to this protected resource.`, key: helpers.encrypt(constants.secret_key, constants.keyHex, constants.ivHex) });
});

app.get('/csvData', async (req, res) => {
  let csvData = await githubHelpers.fetchData()
  res.json(csvData);
});

app.put("/updateCsvData", async (req, res) => {
  const csvBlob = req.body;
  const flatten = csvBlob['flatten'];
  let response = await githubHelpers.uploadCSV(csvBlob['data'], flatten != null ? flatten : true);
  res.status(response['status']).json();
})

const supabase = createClient(
  process.env.supabaseUrl,
  process.env.supa_key
)


// app.use(async (req, res, next) => {
//   if (!pool) {
//     console.log("initialising connection to database");
//     if (process.env.NODE_ENV == "local") {
//       pool = await mysql.createPool({
//         user: process.env.databaseUser,
//         password: process.env.databaseUserPassword,
//         database: process.env.database,
//         connectionLimit: process.env.connectionLimit,
//       });
//     } else {
//       console.log("initialising connection to database");
//       pool = await databaseMiddleware.initializeDatabaseConnection();
//     }
//     console.log("connected and pool created");

//   }
//   req.db = pool;
//   next();
// });

app.post('/login', async (req, res) => {
  const connection = await pool.getConnection();
  const { username, password } = req.body['data'];

  try {
    const [result] = await connection.execute(
      users.FIND,
      [username]
    );
    const user = result[0]
    if (!user || !(password === user.password)) {
      return res.status(401).json({ message: 'Nope not right' });
    }
    const userData = {
      id: user.userId,
      username: user.username,
      role: "user"
    }
    const token = jwt.sign(userData, process.env.jwtpassword, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'None' })
    res.status(201).json({ message: 'Login successful', user: { email: user['email'], email_updates: user['email_updates'] } });
  } catch (error) {
    console.error('Error processing login: ' + error.stack);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    connection.release();
  }
});

app.get('/data', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('performances')
      .select('*');
    // const connection = await req.db.getConnection();
    // const [result, _] = await connection.execute(performances.GET);
    
    const dayIndices = {};
    const groupedData = {
      thursday: [],
      friday: [],
      saturday: []
    };

    data.forEach(row => {
      const dayOfWeek = row.day;

      if (!dayIndices.hasOwnProperty(dayOfWeek)) {
        dayIndices[dayOfWeek] = 0;
      }

      row.index = dayIndices[dayOfWeek];

      dayIndices[dayOfWeek]++;

      if (row['keen'] == null){
        row['keen'] = "";
      }
      if (groupedData.hasOwnProperty(dayOfWeek)) {
        groupedData[dayOfWeek].push(row);
      } else {
        groupedData[dayOfWeek] = [row];
      }
    });

    // connection.release();
    res.json(groupedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// app.use(middleware.verifyToken);

app.post('/script_sql', async (req, res) => {
  const connection = await req.db.getConnection();

  try {
    const queries = req.body;

    const queryPromises = queries.map(query =>
      connection.execute(query.sql, query.params)
        .then(() => {
          console.log("successfully executed: " + query.sql);
        })
    );

    await Promise.all(queryPromises);

    res.status(200).json({ message: 'SQL queries executed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  } finally {
    connection.release();
  }
});

app.use(middleware.verifyToken);

app.put('/data/:id', async (req, res) => {
  const connection = await pool.getConnection();
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const [results] = await connection.execute(
      performances.PUT,
      [updatedData['data'], id]
    );
    res.status(200).json({ message: 'Successfully updated', results });
  } catch (error) {
    console.error('Error executing MySQL query: ' + error.stack);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    connection.release();
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});

module.exports = app;


//npm install express axios fs crypto multer mysql2 @google-cloud/cloud-sql-connector papaparse