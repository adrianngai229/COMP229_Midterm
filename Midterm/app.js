const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

const dbConfig = require('./config/database.config.js');
//MONGODB CONNECTION
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
}).then(() => {
    console.log('DB is connected!');
}).catch(err => {
    console.log('DB not connected!');
    process.exit();
})

app.get('/', (req, res) => {
    res.json({
        "message": "successful!"
    })
})

require('./app/routes/student.routes.js')(app);

app.listen(4000, () => {
    console.log('server is working');
})
