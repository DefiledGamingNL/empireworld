// lib/db.js
import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'ew_cs_db',
    password: 'j4-KKdU8)(/ZT)pV',
    database: 'ew_cs_db'
});

export const query = (...args) =>
    new Promise((resolve, reject) => {
        connection.query(...args, (error, results) => {
            if (error) return reject(error);
            return resolve(results);
        });
    });