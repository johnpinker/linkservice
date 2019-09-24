// routes/note_routes.js
const ObjectID = require("mongodb").ObjectID;

module.exports = function(app, db) {  
    
    // Get one
    app.get("/links/:id", (req, res) => {
        const id = req.params.id;
        const details = { _id: new ObjectID(id) }
        db.collection('links').findOne(details, (err, item) => {
            if (err) {
                res.send({error: "An Error has occured."});
            } else {
                console.log("Fetching item: " + item);
                res.send(item);
            }
        });
    });

    // get all
    app.get("/links", (req, res) => {
        db.collection('links').find({}).toArray((err, result) => {
            if (err) { 
                res.send({'error': 'An Error has occured.'});
            } else {
                console.log("Fetching all.")
                res.send(result);
            }
        });
    })
    
    // insert one
    app.post('/links', (req, res) => {    
        const note = { href: req.body.href, name: req.body.name };    
        db.collection('links').insertOne(note, (err, result) => {      
                if (err) {         
                    res.send({ 'error': 'An error has occurred' });       
                } else {
                    console.log("Inserting one: id: " + result.ops[0]);       
                    res.send(result.ops[0]);      
                }    
        });  
    });

    // update one
    app.put('/links/:id', (req, res) => {
        const id = req.params.id;
        const details = {_id: new ObjectID(id) }
        const note = {$set: {name: req.body.name, href: req.body.href }};
        db.collection('links').updateOne(details, note, (err, result) => {
            if (err) {
                console.log(err);
                console.log(note);
                res.send({ 'error': 'An error has occurred' });  
            } else {
                console.log("updating: " + note);
                res.send(note);
            }
        });
    });

    // delete one
    app.delete('/links/:id', (req, res) => {
        const id = req.params.id;
        const details = { _id: new ObjectID(id) }
        db.collection('links').deleteOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });  
            } else {
                console.log("deleting: " + details);
                res.send(details);
            }
        });
    });
};