const { Pool } = require('pg');
let details = 'mibano'
const pool = new Pool({
    user: details,
    host: 'localhost',
    database: details,
    password: details,
    port: 5432,
});

module.exports = async (q) => {
    const res = await pool.query(q);
    return res.rows
}