const {RefreshToken} = require('../models/index');

module.exports.check = async (req, res, next) => {
    try {
        const token = req.body.refresh;
        const refreshToken = await RefreshToken.findOne({where: {tokenString: token}});
        console.log()
        if (refreshToken == null) {
            next({status: 401, message: 'Problem with session please re login'});
        }
        const numberOfRefreshToken = await RefreshToken.count({where: {userId: refreshToken.dataValues.userId}});
        if (numberOfRefreshToken >= 3) {
            const deleted = await RefreshToken.destroy({where: {userId: refreshToken.dataValues.userId}});
            next();
        } else {
            next();
        }
    } catch (e) {
        next({status: 400, message: 'Invalid request'});
    }
};

