const mysql = require('mysql2/promise');
const { Connector } = require('@google-cloud/cloud-sql-connector');
const { promises: fs } = require('fs');

let connectionName = process.env.connectionName;
let ipType = process.env.ipType;
let database = process.env.database;
let databaseUser = process.env.databaseUser;
let databaseUserPassword = process.env.databaseUserPassword;
let connectionLimit = process.env.connectionLimit;


async function initializeDatabaseConnection() {
  const encodedCredentials = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  const credentials = Buffer.from(encodedCredentials, 'base64').toString('utf8');

  const tempFilePath = '/tmp/service-account.json';
  await fs.writeFile(tempFilePath, credentials);

  process.env.GOOGLE_APPLICATION_CREDENTIALS = tempFilePath;
  console.log("making connection to database...");
  const connector = new Connector();
  const clientOpts = await connector.getOptions({
    instanceConnectionName: connectionName,
    ipType: ipType,
  });
  
  console.log("connected!");
  console.log("creating pool...");
  return mysql.createPool({
    ...clientOpts,
    user: databaseUser,
    password: databaseUserPassword,
    database: database,
    connectionLimit: connectionLimit, // Example limit
  });
  }

  module.exports = {
    initializeDatabaseConnection
}