const blogModel = require('../models/blog.model');
const fs = require('fs');
const path = require('path');

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
            msg: "successfully found all the blog",
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
        const { id } = req.params;
        const singleBlog = await blogModel.findById(id)
        if (!singleBlog) {
            res.status(401).json({
                msg: "there is no blog found",
            })
        }
        res.status(201).json({
            msg: "successfully found the blog",
            singleBlog,
        })
    } catch (error) {
        console.log("error from single Blog", error)
        res.status(500).json({
            msg: "error from single Blog",
            error,
        })
    }
}


exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blogTitle = req.body?.blogTitle;
        const blogDescription = req.body?.blogDescription;
        const image = req.file;
        const blog = await blogModel.findById(id);
        if (!blog) return res.status(404).json({ msg: "Blog not found" });
        if (blogTitle !== undefined) blog.blogTitle = blogTitle;
        if (blogDescription !== undefined) blog.blogDescription = blogDescription;



        // image update and delete
        if (req.file) {
            if (blog.image) {
                try {
                    const oldImageName = blog.image.split("/static/")[1];
                    // console.log(oldImageName)
                    if (oldImageName) {
                        const oldImagePath = path.join(__dirname, "../../public/temp", oldImageName);;
                        fs.unlink(oldImagePath, (err) => {
                            if (err) {
                                console.log("Error deleting old image:", err);
                            }
                        });
                    }

                } catch (error) {
                    console.log("Error processing old image path:", error);
                }

            }
            blog.image = `http://localhost:3000/static/${req.file.filename}`;
        }
        await blog.save();
        res.status(200).json({
            msg: "successfully update the blog",
            blog,
        })

    } catch (error) {
        console.log("error from update blog controller", error);
        res.status(500).json({
            msg: "error from update blog controller",
            error,
        });
    }
}

exports.deleteBlog = async (req , res) => {
    
}