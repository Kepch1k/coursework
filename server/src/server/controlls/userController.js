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
        next({status: 400, message: 'Entered relevant data'+e});
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

module.exports.loginUser = async (req, res, next) => {
    try {
        const id = req.user.id;
        const user = req.user;
        const tokenPair = await tokenController.createTokenPair(id);
        const userForSend = _.omit(user, OTHER_FIELDS);
        res.send({user: userForSend, tokenPair: tokenPair});
    } catch (e) {
        next({status: 404, message: 'Footer not found'});
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
        next({status: 404, message: 'Footer not found'});
    }
};

module.exports.hasEmail = async (req, res, next) => {
    const payload = req.body;
    try {
        const result = await User.find({where: payload});
        if (result) {
            res.send({result: 'has Email'});
        } else {
            res.send({result: 'hasn\'t Email'});
        }
    } catch (e) {
        console.log(e)
    }
};

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const result = await User.findAll({
            order: [
                ['id', 'ASC'],
            ]
        });
        const dataToReceive=result.map((item)=>{
            return _.omit(item.dataValues,NO_NEEDED_FIELD_FOR_ADMIN_PANEL)
        });
        res.send(dataToReceive);
    } catch (e) {
        next({status: 404, message: 'Users not found'});
    }
};

module.exports.updateUserBanStatus = async (req, res, next) => {

    const result = await User.update(
        {isBaned: req.body.banStatus},
        {returning: true, where: {id: req.params.id}}
    );
    const [, [newResult]] = result;
    res.send(newResult.dataValues);
};

module.exports.changeUserPassword = async (req, res, next) => {
    const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));
    const result = await User.update(
        {password: password},
        {returning: true, where: {email: req.body.email}}
    );
    const [, [newResult]] = result;
    if (newResult) {
        res.send({linkToRedirect: "/", msg: "Password has been changed", err: false})
    } else {
        res.send({linkToRedirect: "/", msg: "Error something went wrong", err: true})
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

