// routes/note_routes.js
const ObjectID = require("mongodb").ObjectID;

module.exports = function(app, db) {  
    
    app.get("/links/:id", (req, res) => {
        const id = req.params.id;
        const details = { _id: new ObjectID(id) }
        db.collection('links').findOne(details, (err, item) => {
            if (err) {
                res.send({error: "An Error has occured."});
            } else {
                res.send(item);
            }
        });
    });

    app.get("/links", (req, res) => {
        db.collection('links').find({}).toArray((err, result) => {
            if (err) { 
                res.send({'error': 'An Error has occured.'});
            } else {
                res.send(result);
            }
        });
    })
    
    app.post('/links', (req, res) => {    
        const note = { href: req.body.href, name: req.body.name };    
        db.collection('links').insertOne(note, (err, result) => {      
                if (err) {         
                    res.send({ 'error': 'An error has occurred' });       
                } else {        
                    res.send(result.ops[0]);      
                }    
        });  
    });

    app.put('/links/:id', (req, res) => {
        const id = req.params.id;
        const details = {_id: new ObjectID(id) }
        const note = {name: req.body.name, href: req.body.href }
        db.collection('links').updateOne(details, note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });  
            } else {
                res.send(note);
            }
        });
    });

    app.delete('/links/:id', (req, res) => {
        const id = req.params.id;
        const details = { _id: new ObjectID(id) }
        db.collection('links').deleteOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });  
            } else {
                res.send("Link " + id + ' deleted.');
            }
        });
    });
};