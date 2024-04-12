const express = require('express');
const serverApp = require('./server/app');

const app = express();
app.use(express.static('public'));

serverApp.listen(3001, () => {
    console.log("Server App running on: " + process.env.ServerRoot);
});

app.listen(3000, () => {
    console.log("Client App running on: " + process.env.ClientRoot);
})