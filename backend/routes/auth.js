var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login'
}), function (req, res) {
    res.redirect('/');
});

router.get('/user', (req, res) => {
    res.send(req.user);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.send(req.user);
});

module.exports = router