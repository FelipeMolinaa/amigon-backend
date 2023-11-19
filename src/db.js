const { Pool } = require('pg');

const pool = new Pool({
    user: 'admin',
    host: '172.17.0.2',
    database: 'amigon',
    password: 'admin',
    port: 5432,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};