import jwt from 'jsonwebtoken';

const {RefreshToken} = require('../models/index');
const {
    SECRETS_ACCESS,
    SECRETS_REFRESH,
    LIVE_TIME_ACCESS,
    LIVE_TIME_REFRESH,
    ALGORITHM,
} = require('../utils/Consts');
const createToken = (id, secret, time, algorithm) =>
    jwt.sign({
        idUser: id,
    }, secret, {
        expiresIn: time,
        algorithm: algorithm,
    });


module.exports.createTokenPair = async (id) => {
    try {
        const refreshTokenString = await createToken(id, SECRETS_REFRESH, LIVE_TIME_REFRESH, ALGORITHM);
        const accessToken = await createToken(id, SECRETS_ACCESS, LIVE_TIME_ACCESS, ALGORITHM);
        const refreshToken = await RefreshToken
            .create({
                userId: id,
                tokenString: refreshTokenString,
            });
        return {access: accessToken, refresh: refreshToken.dataValues.tokenString};
    } catch (e) {
        return e
    }
};