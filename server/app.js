const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());


const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const servicesRoutes = require('./routes/servicesRoutes');

app.use('/api/users', userRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/services', servicesRoutes)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
