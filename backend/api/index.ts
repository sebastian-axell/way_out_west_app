let express = require('express');
const cors = require('cors'); 
let app = express();

const path = require('path'); 
const mysql = require('mysql2');

let port = 4040;
const helpers = require("./helpers/helpers");
const upload = require("./storage/storage");
const middleware = require("./middleware/middleware")
const resourceIntegration = require("./resourceIntegration/resourceIntegration");
const constants = require("./constants");

app.use(cors(middleware.corsOptions));
app.use(express.json());

// connect to mysql database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'seb',
  password: 'saxell11',
  database: 'weoutwest'
});

connection.connect((err) => {
  if (err) {
      console.error('Error connecting to MySQL database: ' + err.stack);
      return;
  }
  console.log('Connected to MySQL database as ID ' + connection.threadId);
});

app.post('/upload', upload.upload.array('svgFiles', 10), (req, res) => {
    res.send('SVGs uploaded successfully');
  });
  
app.use('/media', express.static(path.join(__dirname, '..', 'svgs')));

app.get('/protected', middleware.verifyToken, (req, res) => {
    res.json({ message: `Hello! You have access to this protected resource.`, key: helpers.encrypt(constants.access_key, constants.keyHex, constants.ivHex)});
});


app.get('/data',middleware.verifyToken, (req, res) => {
  connection.query(resourceIntegration.GET, (error, results, fields) => {
    if (error) {
        console.error('Error executing MySQL query: ' + error.stack);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
    res.json(results); 
  });
});

app.put('/data/:id', middleware.verifyToken, (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  
  connection.query(resourceIntegration.PUT, [updatedData['keen'], id], (error, results, fields) => {
    if (error) {
        console.error('Error executing MySQL query: ' + error.stack);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
  });
  res.status(200).json({ message: 'Successfully updated' });
});

app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});

module.exports = app;


//npm install express axios crypto multer mysql2