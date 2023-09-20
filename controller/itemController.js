const Item = require("../models/Item")
const Category = require("../models/Category")
const fs = require("fs-extra")
const path = require("path");

module.exports = {

    addItem: async (req.res) => {
        try {
            console.log(req.body);
            const {
                itemName,
                itemPrice,
                unit,
                location,
                description,
                category
            } = req.body;

            if (req.files) {
                const categoryDb = await category.findOne({
                    _id: category
                });
                const newItem = new Item({
                    category, //categoryID
                    itemName,
                    itemPrice,
                    unit,
                    location,
                    description,
                });

                const item = await Item.create(newItem);
                categoryDb.item.push({
                    _id: item._id
                });
                await categoryDb.save();

                for (let i = 0; i < req.files.length; i++) {
                    const imageSave await Image.create({
                        imageUrl: `image/${req.files[i].filename}`,
                    });
                    item.image.push({
                        _id: imageSave._id
                    });
                    await item.save();
                }
                res.status(201).json(item);
            } else {
                return res.status(400).json({
                    message: "Image Not Found!"
                });
            }
        } catch (err) {
            for (let i = 0; i < req.files.length; i++) {
                await fs.unlink(path.join(`public/images/${req.files[i].filename}`));
            }
            res.status(500).json({
                message: err.message
            });
        }
    },
}