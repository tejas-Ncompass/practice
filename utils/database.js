const mysql = require('mysql2/promise');
require('dotenv').config();

let pool=null;

const dbCon={
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true
};

const getPool = () => {
    if (!pool) pool = mysql.createPool(dbCon);
    return pool;
};

const execute = async (sql, params = [], con = null) => {
    const db = con || getPool();
    const [results] = await db.execute(sql, params);
    return results;
};

const query = async (sql, params = [], con = null) => {
    const db = con || getPool();
    const [results] = await db.query(sql, params);
    return results;
};

const startTransact = async () => {
    const con = await getPool().getConnection();
    await con.beginTransaction();
    return con; 
};

const commit = async (con) => {
    if (!con) {
        return;
    }
    await con.commit();
    con.release(); 
};

const rollback = async (con) => {
    if (!con) {
        return;
    }
    await con.rollback();
    con.release(); 
};


module.exports = { execute, query, startTransact, commit, rollback };