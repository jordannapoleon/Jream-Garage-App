const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const config = require('./config.js')[process.env.NODE_ENV||"dev"];
const pool = new Pool ({connectionString: config.connectionString})
pool.connect();

const app = express();
const port = config.port;
app.use(cors());
app.use(express.json());


app.get(`/`, (req,res) =>{
    res.send("Jream-Garage-API");
})

app.get(`/api/cars`, (req,res) =>{
    pool.query(`SELECT * FROM Vehicle`)
        .then(result => {
            console.log('request sent')
            res.send(result.rows)
        })
        .catch (e => console.error(e.stack))
})

app.get('/api/cars/:make', (req, res) => {
    let makeRequest = req.params.make;
    let makeQuery = makeRequest.charAt(0).toUpperCase() + makeRequest.slice(1);

    pool.query(`SELECT * FROM vehicle WHERE make='${makeQuery}';`)
    .then(result => {
        res.send(result.rows)
    })
})



app.listen(port, () => {                   
    console.log(`
    Server Status: Live
    Server Port: ${port}
    Waiting For Requests`
    )
});