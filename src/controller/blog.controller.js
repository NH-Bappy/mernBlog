const blogModel = require('../models/blog.model');


exports.createBlog = async (req, res) => {
    try {
        // console.log(req.file)
        const saveBlog = await new blogModel({
            blogTitle: req.body.blogTitle,
            blogDescription: req.body.blogDescription,
            image: `http://localhost:3000/static/${req.file.filename}`
        }).save();
        if (!saveBlog) {
            res.status(401).json({
                msg: "failed to save blog",
            });
        }
        res.status(201).json({
            msg: "successfully created your Blog",
            data: saveBlog,
        });

    } catch (error) {
        console.log("error from blog controller", error);
        res.status(500).json({
            msg: "error from blog controller",
            error,
        });
    }
}


exports.allBlog = async (req, res) => {
    try {
        const allBlog = await blogModel.find();
        if (!allBlog) {
            res.status(401).json({
                msg: "there no blog or request failed",
            })
        }
        res.status(201).json({
            msg: "successfully found all the blog" ,
            allBlog,
        })
    } catch (error) {
        console.log("error from allBlog controller", error);
        res.status(500).json({
            msg: "error from allBlog controller",
            error,
        })
    }
}

exports.singleBlog = async (req, res) => {
    try {
        const {id} = req.params;
        const singleBlog = await blogModel.findById(id)
        if(!singleBlog){
            res.status(401).json({
                msg: "there is no blog found",
            })
        }
        res.status(201).json({
            msg: "successfully found the blog",
            singleBlog,
        })
    } catch (error) {
        console.log("error from single Blog" ,error)
        res.status(500).json({
            msg: "error from single Blog",
            error,
        })
    }
}


exports.updateBlog = async(req ,res) => {
    
}