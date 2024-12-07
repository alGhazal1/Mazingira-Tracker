//requirements
const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const bcrypt = require('bcrypt'); 
const dotenv = require('dotenv');

// Start app
const app = express();

// configure environment
dotenv.config();

// Start database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


// Connect to database
db.connect((err) => {
    if (err) {
        console.error('Error accessing database:', err.stack);
        return;
    }
    console.log('Connected to database, thread ID:', db.threadId);
});

// Set view engine
app.set('view engine', 'ejs');
app.set('views', __dirname, '/views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true }));

//Working directory
app.use(express.static(path.join(__dirname, 'Mazigira-Tracker')));


// Start the server
const port = 3003;
app.listen(port, () => {
    console.log('Server running on port:', port);
});

