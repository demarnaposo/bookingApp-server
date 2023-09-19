// Import Module
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const path = require("path");


const app = express()

const connectDB = require("./database/db")

// import router

const categoryRouter = require("./router/categoryRouter")
const bankRouter = require("./router/bankRouter")


// connect ke database mongoDb
connectDB();

// seting cors morgan
app.use(cors());
app.use(logger("dev"));
// setup post JSON
app.use(express.json());
// setup post dengan urlencoded
app.use(express.urlencoded({
    extended: false
}));

// Settingan cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, Authorization, authorization, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
});

// setup public url for file
app.use(express.static(path.join(__dirname, 'public')));


// url
app.use("/api/category", categoryRouter)
app.use("/api/bank", bankRouter)

const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World')
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})