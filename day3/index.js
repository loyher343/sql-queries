const express = require('express');
const massive = require('massive');

const app = express();
const port = 3000;

const connectionString = 'postgres://username:password@localhost/test';

const massiveInstance = massive.connectSync({connectionString: connectionString});

app.set('db', massiveInstance);

const db = app.get('db');

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})