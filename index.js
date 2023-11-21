const mongoose = require('mongoose');

const express = require('express');
const app = express();

require('dotenv').config();

const paperRoute = require('./routes/paper')


app.use('/' , paperRoute);

mongoose.connect(process.env.URI).then(
    result => {
        app.listen(3000 , console.log("Server is running on 3000"));
    }
).catch(
    err => {
        console.log(err);
    }
);



