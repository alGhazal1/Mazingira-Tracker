//requirements
const express = require('express');
const path = require('path'); 
const dotenv = require('dotenv');
const ejs = require('ejs');


// Start app
const app = express();

// configure environment
dotenv.config();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true }));

//Working directory
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.get('/', (req, res)=>{
    res.render('index')
});
app.get('/getStarted', (req, res) =>{
    res.redirect('/species')
})

app.get('/user', (req, res)=> {
    res.render('user_home');
})

app.get('/species', async (req, res)=>{
try {
   // const latitude = 0.1
   // const longitude = 37.5
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    console.log(req.query.latitude)
    console.log(req.query.longitude)
    if (!latitude || !longitude) {
    return res.status(400).json({error: 'latitude and longitude required'})
    };

    const response = await fetch(`https://api.gbif.org/v1/occurrence/search?decimalLatitude=${latitude}&decimalLongitude=${longitude}&within=100`);
    if (!response.ok) {
        throw new Error('Failed to fetch data from Dataset');
    }

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
        mediaUrl: (item.media || []).find(media =>media.type === 'StillImage')?.identifier || 'No URL available'
    }));

    console.log(extractedData)
    return res.render('local', {data: extractedData});
    }
catch(error){
    console.error("Error fetching biodata", error)
    console.log(error);
    return res.status(500).json({error:'Error fetching the biodata'})
}})

// Start the server
const port = process.env.PORT || 5001 
app.listen(port, () => {
    console.log('Server running on port: port');
});

