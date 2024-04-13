const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());


const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const positionRoutes = require('./routes/positionRoutes');
const dishRoutes = require('./routes/dishRoutes');

app.use('/api/users', userRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/positions', positionRoutes);
app.use('/api/dishes', dishRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
