const { validateBody } = require('../helpers/validator');
const categoryModel = require('../models/category.model');



//@desc create category

exports.createCategory = async (req, res) => {
    try {
        // console.log(req.body);
        const { emptyBody, fieldName } = validateBody(req);

        if (emptyBody) {
            return res.status(401).json({
                msg: `${fieldName} Missing`
            })
        }

        //isExit categoryName

        const isExit = await categoryModel.findOne({ categoryName: req.body.categoryName });
        if (isExit) {
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
        if (!categorySave) {
            return res.status(401).json({
                msg: `${req.body.categoryName} something wrong`
            })
        }

        return res.status(201).json({
            msg: `${req.body.categoryName} created successfully`
        })


    } catch (error) {
        console.log("error from create category controller", error)
        return res.status(401).json({
            msg: "error from create category controller"
        })
    }
}

//@desc get all data from category
exports.gerAllCategory = async (_, res) => {
    try {
        const allCategory = await categoryModel.find({}).select('-__v')//if went to remove anything like(id,name,or something else) then use this (select('-__name,__v,id'))

        if (!allCategory) {
            return res.status(401).json({
                msg: "category is missing"
            })
        }
        return res.status(201).json({
            msg: "category get successfully",
            data: allCategory
        })
    } catch (error) {
        console.log("error from create grtAllCategory controller", error)
        return res.status(401).json({
            msg: "error from all category"
        })
    }
}

//@desc find category

exports.findCategory = async (req, res) => {
    try {
        // console.log(req.params);
        const { name } = req.params;
        if (!name) {
            return res.status(401).json({
                msg: "category name is missing"
            })
        }
        const allCategoryFind = await categoryModel.find({ categoryName: name })
        if (!allCategoryFind) {
            return res.status(401).json({
                msg: "category is missing"
            })
        }
        return res.status(201).json({
            msg: "successfully find the category",
            data: allCategoryFind,
            status: "ok"
        })

    } catch (error) {
        console.log("error from findCategory", error)
        return res.status(401).json({
            msg: "error from findCategory"
        })
    }
}

//@desc update category
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const upCategory = await categoryModel.findOne({ _id: id })
        // console.log(upCategory)
        upCategory.categoryName = req.body.categoryName || upCategory.categoryName
        upCategory.categoryDescription = req.body.categoryDescription || upCategory.categoryDescription
        upCategory.isActive = req.body.isActive || upCategory.isActive

        // save the new update item
        await upCategory.save()
        return res.status(200).json({
            msg: "update successfully",
            data: upCategory
        })
    } catch (error) {
        console.log("error from update category", error);
        return res.status(401).json({
            msg: "error from update category"
        })
    }
}

//@desc delete from category

exports.deleteCategory = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteCY = await categoryModel.findOneAndDelete({_id:id})
        if(!deleteCY){
            return res.status(401).json({
            msg: "something wrong"
        })
        }
        return res.status(201).json({
            msg: "delete successfully",
            data: deleteCY
        })

    } catch (error) {
        console.log("error from delete category", error);
        return res.status(401).json({
            msg: "error from delete category"
        })
    }
}
