var mongoose = require('mongoose');
var logger = require('../logger');

mongoose.connect('mongodb://127.0.0.1:27017/cuido_blog', { useNewUrlParser: true }, { useUnifiedTopology: true })
    .catch(error => logger.error("Cannot connect to database " + error));

module.exports = {
    db: mongoose
}