const express = require('express');
const serverApp = require('./Server/app');

const app = express();
app.use(express.static('public'));

serverApp.listen(3001, () => {
    console.log("Server App listening on port 3001");
});

app.listen(3000, () => {
    console.log("App listening on pоrt 3000");
})