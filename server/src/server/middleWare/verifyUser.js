const {User} = require('../models/index');
const bcrypt = require('bcrypt');

module.exports.verify = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({
            where: {email: email},
        });

        if (user === null) {

            next({status: 404, message: 'User not founds'});
        }

        req.user = user.dataValues;

        const match = await bcrypt.compare(password, user.dataValues.password);
        if (match) {
            if (user.dataValues.isBaned) {
                next({status: 403, message: 'User is baned'});
            }
            next();
        } else {

            next({status: 404, message: 'User not founds'});

        }
    } catch (e) {

        next({status: 404, message: 'User not founds'});
    }
};

