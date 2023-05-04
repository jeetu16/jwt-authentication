const errorHandler = require('./middleware/errorHandler');
const path = require('path');
const { logger } = require('./middleware/logEvents');
const cors = require('cors');
const express = require('express');
const app = express();
const router = require('./routes/subdir');
const originOpts = require('./config/corsOptions');
const jwtVerify = require('./middleware/jwtVerity');

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

// server static files
app.use(express.static(path.join(__dirname,'/public')));
app.use('/subdir',express.static(path.join(__dirname,'/public')));


// routes
app.use('/', require('./routes/root'));
app.use('/subdir',require('./routes/subdir'));
app.use('/employees',jwtVerify,require('./routes/api/employees'));
app.use('/auth',require('./routes/auth'));
app.use('/register',require('./routes/register'));
app.use('/deleteuser',require('./routes/deleteUser'));


// chaining route handlers
app.all('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'pages', '404.html'));
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Successfully Running On ${PORT}`));