const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});
MongoClient.connect(db.url, (err, database) => {  
    if (err) return console.log(err)                        
    // Make sure you add the database name and not the collection name  
    database = database.db("link-db")  
    require('./app/routes')(app, database);
  app.listen(port, () => {    
    console.log('We are live on ' + port);  
  });               
})

