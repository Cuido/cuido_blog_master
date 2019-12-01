var isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.json({
            message: "Not authenticated"
        })
    }
}

module.exports = isAuthenticated;