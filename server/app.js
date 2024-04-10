const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
