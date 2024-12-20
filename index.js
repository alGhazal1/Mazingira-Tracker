//requirements
const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const bcrypt = require('bcrypt'); 
const dotenv = require('dotenv');
const ejs = require('ejs');


// Start app
const app = express();

// configure environment
dotenv.config();

// Start database connection
// const db = mysql.createPool({
//     connectionLimit:10,
//     host: process.env.DB_HOST,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

 
// Connect to database
// let speciesdb = {}
// speciesdb.all = ()=>{
//     return new Promise((path.resolve, reject)=>(
//         pool.query('SELECT * from dataset')
//     ))
// }
// db.connect((err) => {
//     if (err) {
//         console.error('Error accessing database:', err.stack);
//         return;
//     }
//     console.log('Connected to database, thread ID:', db.threadId);
// });

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true }));

//Working directory
app.use(express.static(path.join(__dirname, 'Mazigira-Tracker')));

//routes
app.get('/', (req, res)=>{
    res.render('index.ejs')
});

app.get('/species', (req, res)=> {
    const speciesPath= path.resolve(__dirname,'views','index.ejs')
    res.render(speciesPath);
})
app.get('/species1', async (req, res)=>{
try {
    const response=await fetch('https://api.gbif.org/v1/occurrence/search?limit=10');
    const results= await response.json();
    const biodata = results.results;
    const extractedData = biodata.map((item)=>(
        {
        scientificName: item.scientificName,
        species: item.species,
        genericName: item.genericName,
        dateIdentified: item.dateIdentified,
        decimalLatitude: item.decimalLatitude,
        decimalLongitude: item.decimalLongitude,
        continent: item.continent,
        stateProvince: item.stateProvince,
        eventDate: item.eventDate,
        verbatimLocality:item.verbatimLocality,
        mediaUrl: (item.media || []).find(media =>{
            media.type === 'StillImage'
        })?.identifier || 'No URL available'
 
    }))
    console.log(extractedData)
    // res.json(extractedData);
     res.render('index', {data: extractedData})
    }
catch(error){
    console.error("Error fetching biodata", error)
    res.status(500).json({error:'Error fetching the biodata'})
}})

// Start the server
const port = process.env.PORT || 5001 
app.listen(port, () => {
    console.log('Server running on port:', port);
});

