const mongoose = require("mongoose");
module.exports = mongoose.connect('mongodb://localhost:27017/db-dev', {
    useNewUrlParser: true,
    user: 'mongoDB',
    pass: 'password',
    dbName:'db-dev',
});
