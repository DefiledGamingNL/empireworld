const mysql = require('mysql2');



export default function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body

    // Optional logging to see the responses
    // in the command line where next.js app is running.
    console.log('body: ', body)

    // Guard clause checks for first and last name,
    // and returns early if they are not found
    if (!body.email || !body.password) {
        // Sends a HTTP bad request error code
        return res.status(400).json({ data: 'Email Address or Password not found' })
    }

    // Found the name.
    // Sends a HTTP success code
    res.status(200).json({ data: `${body.email} ${body.password}` })

    // add the user to database.

    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'ew_cs_db',
        password: 'j4-KKdU8)(/ZT)pV',
        database: 'ew_cs_db'
    });
    conn.connect();
    conn.query(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [body.email, body.password],
        function (error, results) {
            if (error) throw error;
            console.log('User added: ', results.insertId);
        }
    );
}