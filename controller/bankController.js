const Bank = require("../models/Bank")
const fs = require("fs-extra")
const path = require("path");

module.exports = {

    addBank: async (req, res) => {
        console.log(req.body)
        const {
            bankName,
            accountHolder,
            accountNumber
        } = req.body;
        if (!req.file) {
            return res.status(400).json({
                message: "Image Not Found!"
            })
        }

        const bank = new Bank({
            bankName,
            accountHolder,
            accountNumber,
            imageUrl: `images/${req.file.filename}`
        });

        await bank.save

        try {

            await bank.save();
            res.status(200).json(bank)

        } catch (err) {
            await fs.unlink(path.join(`public/images/${req.file.filename}`))
            res.status(400).send(err.message)

        }
    },


}