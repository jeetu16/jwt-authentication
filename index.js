require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const path = require('path');
const { logger } = require('./middleware/logEvents');
const cors = require('cors');
const express = require('express');
const app = express();
const originOpts = require('./config/corsOptions');
const jwtVerify = require('./middleware/jwtVerity');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/connectDB');

// connect to MongoDB

connectDB();

const PORT = process.env.PORT || 3400;

// custom middleware
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(originOpts));

// built-in middleware to handle urlencoded data
// in other words, form data:
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended:false }));

// built-in middleware for josn
app.use(express.json());

// middleware for cookie
app.use(cookieParser());

// server static files
app.use(express.static(path.join(__dirname,'/public')));
app.use('/subdir',express.static(path.join(__dirname,'/public')));


// routes
app.use('/', require('./routes/root'));
app.use('/refresh',require('./routes/refresh'))
app.use('/user',require('./routes/api/user'));
app.use('/employees',jwtVerify,require('./routes/api/employees'));


// chaining route handlers
app.all('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'pages', '404.html'));
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Successfully Running On ${PORT}`));
})