const express = require('express');
const massive = require('massive');

const app = express();
const port = 3000;

const connectionString = 'postgres://username:password@localhost/test';

const massiveConnection = massive(connectionString)
.then(db => {
   app.set('db', db)
})

// Add endpoint here

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})