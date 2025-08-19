const express = require('express');
require('dotenv').config();
const userController = require('./controller/user.controller')
const app = express();

//use of middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))









app.post("/registration",userController.registration);
app.post("/login",userController.login);



module.exports = { app }