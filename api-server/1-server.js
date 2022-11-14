const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const config = require('./config.js')[process.env.NODE_ENV||"dev"];
const port = config.port;

const pool = new Pool ({connectionString: config.connectionString});
pool.connect();

const app = express();
app.use(cors());
app.use(express.json());

//Home Page
app.get(`/`, (req,res) =>{
    res.send("Jream-Garage-API");
})
//Cars
app.get(`/api/cars`, (req,res) =>{
    pool.query(`SELECT * FROM Vehicle`)
        .then(result => {
            console.log('request sent')
            res.send(result.rows)
        })
        .catch (e => {
            console.error(e.stack)
            res.send(404, "Not Found")
        })
})
//Companies
app.get(`/api/companies`, (req,res) =>{
    pool.query(`SELECT * FROM Companies`)
        .then(result => {
            console.log('request sent')
            res.send(result.rows)
        })
        .catch (e => {
            console.error(e.stack)
            res.send(404, "Not Found")
        })
})
//Makes
app.get('/api/cars/:carsSearch', (req, res) => {
    let makeRequest = req.params.carsSearch;
    console.log("before slice", makeRequest)
    let makeQuery = makeRequest.charAt(0).toUpperCase() + makeRequest.slice(1);
    console.log(makeQuery);
    console.log(req.params);

        pool.query(`SELECT * FROM vehicle WHERE
        make='${makeQuery}' OR model='${makeQuery}' OR type='${makeQuery}' OR color='${makeQuery}';`)
        .then(result => {
            res.status(200).send(result.rows)
        })
        .catch(e => {
            console.error(e.stack);
            res.status(404).send("Not Found")
        })
  

})
//Models
// app.get('/api/cars/:model', (req, res) => {
//     let makeRequest = req.params.model;
//     let makeQuery = makeRequest.charAt(0).toUpperCase() + makeRequest.slice(1);

//     pool.query(`SELECT * FROM vehicle WHERE model='${makeQuery}';`)
//     .then(result => {
//         res.send(result.rows)
//     })
// })






app.listen(port, () => {                   
    console.log(`
    Server Status: Live
    Server Port: ${port}
    Waiting For Requests`
    )
});