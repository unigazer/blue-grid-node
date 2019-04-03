// Imports
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();

// RESTful API Endpoint
app.get('/users', (req, res) => {
    // Get the quiery params
    let { name, email, limit } = req.query;
    
    // Connecto to MongoDB instance
    MongoClient.connect('mongodb://localhost:27017/', (err, db) => {
        // Abort if error occures
        if (err) throw err;
        // Get the database
        let dbName = db.db('VladimirJovanovic');
        // Search through the collection
        dbName.collection('users').find({ email, name }, (err, res) => {
            if (err) throw err;
            db.close();
        }).limit(limit);
    });
    res.end();
});

app.listen(process.env.PORT || 3000, () => {
    console.log('The application is running');
});
