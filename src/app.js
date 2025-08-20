const express = require('express');
require('dotenv').config();
const userController = require('./controller/user.controller');
const categoryController = require('./controller/categoryController');
const app = express();

//use of middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.post("/registration",userController.registration);
app.post("/login",userController.login);

//category routes

app.post('/create-category',categoryController.createCategory);
app.get('/getAllCategory', categoryController.gerAllCategory);
app.get('/find-Category/:name',categoryController.findCategory);
app.put('/update-category/:id',categoryController.updateCategory);
app.delete('/delete-category/:id', categoryController.deleteCategory);


module.exports = { app }