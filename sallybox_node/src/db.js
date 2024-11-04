// src/db.js
const oracledb = require('oracledb');
require('dotenv').config();

async function initialize() {
    try {
        await oracledb.createPool({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectionString: process.env.DB_CONNECTION_STRING,
        });
        console.log('OracleDB pool created');
    } catch (err) {
        console.error('Error creating OracleDB pool:', err);
        process.exit(1);
    }
}

async function getConnection() {
    return await oracledb.getConnection();
}

async function closePool() {
    try {
        await oracledb.getPool().close(0);
        console.log('OracleDB pool closed');
    } catch (err) {
        console.error('Error closing OracleDB pool:', err);
    }
}

module.exports = { initialize, getConnection, closePool };
