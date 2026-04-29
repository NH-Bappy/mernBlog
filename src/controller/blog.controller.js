const blogModel = require('../models/blog.model');


exports.createBlog = async(req ,res) => {
    try {
        
        console.log(req)


    } catch (error) {
        console.log("error from blog controller" , error);
        res.status(500).json({
            msg: "error from blog controller" ,
            error,
        });
    }
}