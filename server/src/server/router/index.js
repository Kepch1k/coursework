import 'babel-polyfill';
import express from 'express';
import multer from 'multer';

const router = express.Router();
const userController = require('../controlls/userController');
const notesController = require('../controlls/notesController');

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
//user
router.post('/user', userController.createUser);
router.post('/login',verifyUser.verify, checkCountRefreshToken.check, userController.loginUser);
router.get('/user', verifyAccessToken.check, userController.getUser);
//token
router.post('/refresh', verifyRefreshToken.check, refreshTokenFindAndCount.check, userController.refreshUser);
//note
router.post('/note', verifyUser.verify, notesController.createNote);
router.put('/note', verifyUser.verify, notesController.updateNote);
router.delete('/note', verifyUser.verify, notesController.deleteNote);
router.get('/note', verifyAccessToken.check, notesController.getNote);

module.exports = router;