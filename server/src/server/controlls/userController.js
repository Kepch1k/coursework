const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, RefreshToken} = require('../models/index');
const {
    OTHER_FIELDS,
    NO_NEEDED_FIELD_FOR_ADMIN_PANEL
        } = require('../utils/Consts');
const tokenController = require('./tokenController');

module.exports.createUser = async (req, res, next) => {
    const user = req.body;
    console.log(user);
    try {
        const password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
        const DataToCreate = Object.assign({}, user, {password: password});
        const createdUser = await User.create(DataToCreate);
        const id = createdUser.dataValues.id;
        const tokenPair = await tokenController.createTokenPair(id);
        const userForSend = _.omit(createdUser.dataValues, OTHER_FIELDS);
        res.send({
            user: userForSend,
            tokenPair,
        });
    } catch (e) {
        console.log(e);
        next({status: 400, message: 'Entered relevant data'});
    }
};

module.exports.loginUser = async (req, res, next) => {
    console.log("req.body",req.body);
    try {
        const id = req.user.id;
        const user = req.user;

        const tokenPair = await tokenController.createTokenPair(id);
        const userForSend = _.omit(user, OTHER_FIELDS);
        res.send({user: userForSend, tokenPair: tokenPair});
    } catch (e) {
        next({status: 404, message: 'User not found'});
    }
};

module.exports.getUser = async (req, res, next) => {
    const id = req.idUser;
    try {
        const result = await User.findOne({where: {id}});
        const user = result.dataValues;
        const userForSend = _.omit(user, OTHER_FIELDS);
        res.send(userForSend);
    } catch (e) {
        next({status: 404, message: 'ManagePanel not found'});
    }
};

module.exports.refreshUser = async (req, res, next) => {
    const id = req.id;
    try {
        const tokenPair = await tokenController.createTokenPair(id);
        res.send({tokenPair});
    } catch (e) {
        next({status: 401, message: 'Your session ended. Please re login.'});
    }
};

module.exports.logout = async (req, res, next) => {
    await RefreshToken.destroy({
        returning: true,
        where: {
            tokenString: req.body.data.token
        }
    });
    res.send("OK");
};
