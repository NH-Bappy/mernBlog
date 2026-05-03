const blogModel = require('../models/blog.model');


exports.createBlog = async(req ,res) => {
    try {
        console.log(req.file)
        const saveBlog = await new blogModel({
            blogTitle: req.body.blogTitle,
            blogDescription: req.body.blogDescription,
            image: `http://localhost:3000/static/${req.file.filename}`
        }).save();
        if(!saveBlog){
            res.status(401).json({
                msg: "failed to save blog",
            });
        }
        res.status(201).json({
            msg: "successfully created your Blog",
            data: saveBlog,
        });

    } catch (error) {
        console.log("error from blog controller" , error);
        res.status(500).json({
            msg: "error from blog controller" ,
            error,
        });
    }
}


exports.singleBlog = async(req , res) => {
    
}

