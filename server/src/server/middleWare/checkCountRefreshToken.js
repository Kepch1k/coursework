const {RefreshToken} = require('../models/index');

module.exports.check = async (req, res, next) => {
    try {
        const id = req.user.id;

        const numberOfRefreshToken = await RefreshToken.count({where: {userId: id}});
        if (numberOfRefreshToken >= 3) {
            const deleted = await RefreshToken.destroy({where: {userId: id}});
        } else {
        }
        next();
    } catch (e) {
        next({status: 400, message: 'Invalid request'});
    }
};

