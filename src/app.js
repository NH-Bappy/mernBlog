const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const userController = require('./controller/user.controller');
const categoryController = require('./controller/categoryController');
const blogController = require('./controller/blog.controller');
const upload = require('../src/middleware/multer.middleware');


//use of middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//registration

app.post("/registration",userController.registration);
app.post("/login",userController.login);

//category routes

app.post('/create-category',categoryController.createCategory);
app.get('/getAllCategory', categoryController.gerAllCategory);
app.get('/find-Category/:name',categoryController.findCategory);
app.put('/update-category/:id',categoryController.updateCategory);
app.delete('/delete-category/:id', categoryController.deleteCategory);


//blog api route
app.post("/create-blog" ,upload.single("image") , blogController.createBlog);
app.use('/static', express.static(path.join(__dirname, '../public/temp')));
app.get("/allBlog" , blogController.allBlog);
app.get("/singleBlog/:id" , blogController.singleBlog);
app.put("/update-blog/:id" , blogController.updateBlog)

module.exports = { app }