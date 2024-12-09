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

//routes
app.get('/', (req, res)=>{
    const biodata = req.body;
    res.sendfile('index.html')
});

app.get('/test', (req, res)=>{
    
    let count=0

    res.send({count})
});

// app.post('/test', (req, res)=>{
//     ++ count;
//     res.send({count})
// });


app.get('/species', async (req, res)=>{
try {
    const response=await fetch('https://api.gbif.org/v1/occurrence/search?limit=10');
    const biodata= await response.json
    res.json(biodata);
    }
catch(err){
    console.err("Error fetching biodata")
    res.status(500).json({error:'Error fetching the biodata'})
}})

// Start the server
const port = process.env.PORT || 5001 
app.listen(port, () => {
    console.log('Server running on port:', port);
});

