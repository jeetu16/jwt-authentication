const express = require('express');
const router = express.Router();
const path = require('path');


router.get('^/$|index(.html)?', (req,res) => {
    res.status(200).sendFile(path.join(__dirname,'..','pages','subdir','index.html'));
})

router.get('^/test(.html)?', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'pages', 'subdir', 'test.html'));
})


module.exports = router;
