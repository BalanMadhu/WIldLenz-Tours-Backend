const express = require('express')
const app = express()
app.use(express.json())
const port = 8080



const http = require('http')
const cors = require('cors')
app.use(cors("*"))

const mongoose = require('mongoose')

const dbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ymfhtpd.mongodb.net/${process.env.DBNAME}`;

const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(dbUrl, option)
    .then(() => {
        console.log('----------------------------db connected successfully-----------------------------');

    }).catch((err) => {
        console.log('Error connecting to database:', err);
        process.exit(1);
    });

const route = require('./routes/router')
app.use('/user', route)

app.get("/", (req, res, next) => {
    res.status(200).json({ status: 200, message: "Hello from servers" });
});


const httpsServer = http.createServer(app);
const server = httpsServer.listen(port, function () {
    console.log('-----------------------------------------', `http://localhost:${process.env.PORT}`, '----------------------------------------------------');
});
module.exports = server;
