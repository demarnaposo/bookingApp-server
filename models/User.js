const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({

    userName: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "Please Input Username!"]
    },
    email: {
        type: String,
        required: [true, "Please Input Email!"],
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error("Please Provide a Valid Email Address")
            }
        }
    },
    role: {
        type: String,
        enum: ["admin", "owner"],
        default: "owner"
    },

    password: {
        type: String,
        required: [true, "Please Input Password!"],
        minlenght: 7, //min 7 char untuk password
        trim: true,

    },
    passwordConfirm: {
        type: String,
        required: [true, "Please Input Password Confirm!"],
        validate(value) {
            if (this.password !== this.passwordConfirm) {
                return true;

            }
        }
    },
    tokens: [{
        type: String
    }, ]


}, {
    timestamps: true
})

// generate token
userSchema.method.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({
            _id: user._id.toString()
        },
        "Niomic", {
            expiresIn: "1 days", // waktu berdasarkan grammer english
        });
    user.tokens = user.token.concat({
        token
    })
    await user.save();
    return token;
}

// custom JSON convert
userSchema.methods.toJSOn = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.passwordConfirm;
    delete userObject.tokens;

    return userObject;

}

// login cek

userSchema.static.findbyCredentials = async (email, password) => {
    const user = User.findByOne({
        email
    });

    if (!user) {
        throw Error("User Not Found!")
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw Error("Wrong Password!")
    }
    return user;
}

// hashing password 
userSchema.pre("save", async function (next) {
    const user = this;

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    if (user.isModified("passwordConfirm")) {
        user.passwordConfirm = await bcrypt.hash(user.passwordConfirm, 8);
    }
    next();

})


module.exports = mongoose.model("User", userSchema)