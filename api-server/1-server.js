const express = require('express');
const cors = require('cors');
const { Client } = require('pg');

const config = require('./config')[process.env.NODE_ENV||"dev"];
const port = config.port;

const client = new Client ({connectionString: config.connectionString});
client.connect();

const app = express();
app.use(cors());
app.use(express.json());

//Home Page
app.get(`/`, (req,res) =>{
    res.status(200).send("Jream-Garage-API");
})

//Cars
app.get('/api/cars', (req,res) =>{
    client.query(`SELECT * FROM vehicle ORDER BY make ASC`)
        .then(result => {
            console.log('request sent')
            res.status(200).send(result.rows)
        })
        .catch (e => {
            console.error(e.stack)
            res.status(404).send("Not Found")
        })
})
//Companies
app.get(`/api/companies`, (req,res) =>{
    client.query(`SELECT * FROM Companies`)
        .then(result => {
            console.log('request sent')
            res.send(result.rows)
        })
        .catch (e => {
            console.error(e.stack)
            res.status(404).send("Not Found")
        })
})

// ===== GET REQUESTS =====
app.get('/api/cars/:carsSearch', (req, res) => {
    
    let makeRequest = req.params.carsSearch;                                                           //User Input
    let makeQuery = makeRequest.charAt(0).toUpperCase() + makeRequest.slice(1);                        //Capitilize First Letter


        client.query(`SELECT * FROM vehicle WHERE
        make='${makeQuery}' OR model='${makeQuery}' OR type='${makeQuery}' OR color='${makeQuery}';`)
        .then(result => {

            if (result.rows.length === 0){

                res.status(404).send("Not Found")
            } else {
                res.status(200).send(result.rows)
            }
        })
        .catch(e => {
            console.error(e.stack);
            res.status(404).send("Not Found")
        })
  

})
app.get('/api/companies/:compSearch', (req, res) => {
    
    let makeRequest = req.params.compSearch;                                                           //User Input
    let makeQuery = makeRequest.charAt(0).toUpperCase() + makeRequest.slice(1);                        //Capitilize First Letter


        client.query(`SELECT * FROM companies WHERE
        name='${makeQuery}' OR founder='${makeQuery}';`)
        .then(result => {
            
            if (result.rows.length === 0){
                res.status(404).send("Not Found")
            } else {
                
                res.status(200).send(result.rows)
            }
        })
        .catch(e => {
            console.error(e.stack);
            res.status(404).send("Not Found")
        })
  

})


// ===== POST REQUESTS =====
app.post('/api/cars/', (req, res) =>{
    client.query(`INSERT INTO vehicle (make, model, year, type, color) VALUES ('${req.body.make}','${req.body.model}',${req.body.year},${req.body.type},${req.body.color})`)
    .then((result) => {
        console.log("Car Added")
        res.status(200).send(result.rows);
    })
    .catch((e) => console.log(e.stack));
})
app.post('/api/cars/', (req,res) => {
    client.query(`INSERT INTO vehicle (make, model, year, type, color) VALUES ('${req.body.name}','${req.body.founder}',${req.body.date})`)
    .then((result) => {
        console.log("Company Added")
        res.status(200).send(result.rows);
    })
    .catch((e) => console.log(e.stack));
})

// ===== PATCH REQUEST =====
app.patch('/api/cars/:id', (req, res)=>{
    var patchRequest = "SET";

    client.query(`SELECT * FROM vehicle WHERE id=${req.params.id}`)
    .then((result) => {

        var checkedKey = []; //CHECKS TABLE FIELDS
        for(let i = 0; i < result.fields.length; i++){
            checkedKey.push(result.fields[i].name);    
        }
        // CHECKS JSON BODY WITH FIELDS
        for(ele in req.body) {
            let key = ele;
            let value = req.body[key];
                if(checkedKey.includes(key) === false){
                    res.status(400).end(`Bad Request ${key} is invalid`);
                    return;
                } else if(typeof req.body[key] === 'number'){
                    patchRequest += ` ${key}=${value},`;
                } else {
                    patchRequest += ` ${key}='${value}',`;
                }
            
        }
            let finalQuery = patchRequest.slice(0,-1);
        
                client.query(`UPDATE vehicle ${finalQuery} WHERE id=${req.params.id}`)
                .then(() => {
                    res.status(200).end((`You've successfully ${finalQuery}`));
                })
                .catch((e) => {
                    console.log(e.stack)});

    })
    .catch((e) => {
        console.error(e.stack)});

})
//DONT TOUCH
app.delete('/api/cars/:id', (req, res) => {

    console.log(req.params);
    client.query(`DELETE FROM cars WHERE id=${id}`)
    .then(
        res.status(200).send("Deleted")
    )
    .catch(
        res.status(404).send("Id not found")
    )
})

app.listen(port, () => {                   
    console.log(`
    Server Status: Live
    Server Port: ${port}
    Waiting For Requests`
    )
});