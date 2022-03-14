// importing the packages
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//app.use(require('./routes'));

const PORT = process.env.PORT || 3001;

// mongoose connection and logging:
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-database');
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`now connected on localhost:${PORT}`))