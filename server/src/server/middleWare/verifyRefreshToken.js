import jwt from 'jsonwebtoken';

const {SECRETS_REFRESH} = require('../utils/Consts');

module.exports.check = async (req, res, next) => {
    try {
        const token = req.body.refresh;
        const decoded = await jwt.verify(token, SECRETS_REFRESH);
        req.id = decoded.idUser;
        next();
    } catch (e) {
        next({status: 401, message: 'Your session ended. Please re login.'});
    }
};

