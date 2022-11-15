//imports dev & production objects from config.js;
const config = require("./config.js")[process.env.NODE_ENV || "dev"];

//imports express node modules;
const express = require("express");

//Assigns PORT with the port from the config file depending on the NODE_ENV it's on;
const PORT = config.port;

//Assigns app with the express node;
const app = express();

//Upon connecting to this server it gives the user files located in the public folder HTML, JS, CSS;
app.use(express.static("./public"));

//Logs if server is active and what port its on;
app.listen(PORT, () => {
  console.log(`
    Server Status: Live
    Server Port: ${PORT}
    Website active`);
});
