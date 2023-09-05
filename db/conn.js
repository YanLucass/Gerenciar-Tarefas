const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'seu-nome',
    password: '1234567',
    database: 'seu-banco'

});

module.exports = pool;