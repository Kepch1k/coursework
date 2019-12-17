import jwt from 'jsonwebtoken';

const {SECRETS_ACCESS} = require('../utils/Consts');

module.exports.check = async (req, res, next) => {
    console.log("\n\n\n","check","\n\n\n");
    try {
        const authHeader = req.headers.authorization;
        const number = authHeader.indexOf(' ') + 1;
        const token = authHeader.substr(number, authHeader.length - number);
        const decoded = await jwt.verify(token, SECRETS_ACCESS);
        req.idUser = decoded.idUser;
        console.log("\n\n\n","complete","\n\n\n");
        next();
    } catch (e) {
        console.log("\n\n\n error","\n\n\n");
        next({status: 403, message: "Your session ended. Please re login."})
    }
};

