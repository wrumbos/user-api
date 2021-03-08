const usersRoute = require('./app/routes/usersRoute')
const express = require('express')
const app = express()
app.use(express.json());
app.use('/api/', usersRoute);
module.exports = app
