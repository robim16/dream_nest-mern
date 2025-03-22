const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const authRoutes = require('./routes/auth');
const listingRoutes = require('./routes/listing')
const bookingRoutes = require('./routes/booking')
const userRoutes = require('./routes/user')

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/auth', authRoutes);
app.use('/properties', listingRoutes);
app.use('/bookings', bookingRoutes);
app.use('/users', userRoutes);

const PORT = 3001;

//process.env.MONGO_URL
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.log('error al conectar la db' + err);
});

