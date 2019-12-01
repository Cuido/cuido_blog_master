var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    if(req.user) {
        res.json({
            user: req.user
        })
    } else {
        res.send("No user found");
    }
})

module.exports = router;