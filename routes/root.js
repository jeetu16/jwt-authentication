const express = require('express');
const path = require('path');
const router = express.Router();



router.get('^/$|index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'pages', 'index.html'));
})

router.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages', 'new-page.html'));
})

router.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html');  // 302 by Default means temporary redirect
});

module.exports = router;