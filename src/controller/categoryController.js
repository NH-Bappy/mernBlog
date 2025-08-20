const {validateBody} = require('../helpers/validator');
const categoryModel = require('../models/category.model');



//@ desc create category

exports.createCategory = async(req,res) => {
try {
    // console.log(req.body);
    const {emptyBody, fieldName} = validateBody(req);

    if(emptyBody){
        return res.status(401).json({
            msg: `${fieldName} Missing`
        })
    }

    //isExit categoryName

    const isExit = await categoryModel.findOne({categoryName: req.body.categoryName});
    if(isExit){
        return res.status(401).json({
            msg: `${isExit.categoryName} already exit try another one`
        })
    }

    // save category into database

    const categorySave = await new categoryModel(
        {
            categoryName: req.body.categoryName,
            categoryDescription: req.body.categoryDescription,
            isActive: req.body.isActive
        }
    ).save()

    // if we can't save data then
    if(!categorySave){
        return res.status(401).json({
            msg: `${req.body.categoryName} something wrong`
        })
    }
    
    return res.status(201).json({
        msg: `${req.body.categoryName} created successfully`
    })


} catch (error) {
    console.log("error from create category controller",error)
    return res.status(401).json({
        msg:"error from create category controller"
    })
}
}