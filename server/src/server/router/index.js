import 'babel-polyfill';
import express from 'express';
import multer from 'multer';

const {ROLE_BUYER, ROLE_CREATIVE, CREATE, CHANGE, WATCH, CONTESTS} = require('../utils/Consts');
const RIGHTS_OF_USERS = require('../utils/Permisions');
const router = express.Router();
const userController = require('../controlls/userController');
const mailServiceController = require('../controlls/mailServiceController');
const contestController = require('../controlls/contestController');
const notesController = require('../controlls/notesController');
const verifyRefreshToken = require('../middleWare/verifyRefreshToken');
const verifyAccessToken = require('../middleWare/verifyAccessToken');
const refreshTokenFindAndCount = require('../middleWare/refreshTokenFindAndCount');
const verifyUser = require('../middleWare/verifyUser');
const checkCountRefreshToken = require('../middleWare/checkCountRefreshToken');
const checkCardExists = require('../middleWare/checkCardExistsAndBalance');
const preparingDataForFilter = require('../middleWare/preparingDataForFilter');
const role = require('../middleWare/checkPermissions');
const entriesController = require('../controlls/entriesController');

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
router.get('/user', verifyAccessToken.check, userController.getUser);
router.get('/getAllUsers', verifyAccessToken.check, userController.getAllUsers);
router.post('/refresh', verifyRefreshToken.check, refreshTokenFindAndCount.check, userController.refreshUser);
router.post('/login', verifyUser.verify, checkCountRefreshToken.check, userController.loginUser);
router.post('/contest/:id', upload.any(), contestController.createContest);
router.put('/contest/:id', upload.any(), contestController.updateContest);
router.get('/contest/:id', verifyAccessToken.check, contestController.receiveContestById);
router.delete('/contest/:id', contestController.deleteContest);
router.put('/changePassword', userController.changeUserPassword);
router.post('/contestPayment', checkCardExists.check, contestController.payment);
router.post('/banStatusUpdate/:id', verifyAccessToken.check, userController.updateUserBanStatus);
router.delete('/logout', userController.logout);
router.post('/userEmail', userController.hasEmail);
router.post('/createLinkApi', mailServiceController.createLink);
router.get('/service/:api', mailServiceController.receiveApi);
router.get('/getUserContests/:id', contestController.receiveContests);
router.get('/contestFilter', preparingDataForFilter.prepare, contestController.receiveFilterContests);
router.post('/entry', verifyAccessToken.check, upload.any(), entriesController.createEntry);
router.put('/entry/:id', verifyAccessToken.check, entriesController.changeStatus);
router.post('/test', notesController.test);


module.exports = router;