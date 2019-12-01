var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    if (req.session.token) {
        res.cookie('token', req.session.token);
        res.json({
            status: 'session cookie set',
            user: req.user
        });
    } else {
        res.cookie('token', '')
        res.json({
            status: 'session cookie not set',
            user: req.user
        });
    }
})

module.exports = router;