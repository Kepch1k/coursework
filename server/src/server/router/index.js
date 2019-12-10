import 'babel-polyfill';
import express from 'express';
import multer from 'multer';

const router = express.Router();
const userController = require('../controlls/userController');

const verifyUser = require('../middleWare/verifyUser');
const checkCountRefreshToken = require('../middleWare/checkCountRefreshToken');
const verifyAccessToken = require('../middleWare/verifyAccessToken');
const verifyRefreshToken = require('../middleWare/verifyRefreshToken');
const refreshTokenFindAndCount = require('../middleWare/refreshTokenFindAndCount');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer(storage);
router.post('/user', userController.createUser);
router.post('/login',verifyUser.verify, checkCountRefreshToken.check, userController.loginUser);
router.get('/user', verifyAccessToken.check, userController.getUser);
router.post('/refresh', verifyRefreshToken.check, refreshTokenFindAndCount.check, userController.refreshUser);

module.exports = router;