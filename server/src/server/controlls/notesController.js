const _ = require('lodash');
const {Note} = require('../models/index');
const uniqid = require('uniqid');
const {sequelize} = require('../models');

module.exports.createNote = async (req, res, next) => {
    const {preparedData} = req;
console.log("req.preparedData",req.preparedData);
    try {
        const createdNote = await Note.create(preparedData);
        res.send({
            note: createdNote.dataValues
        });
    } catch (e) {
       // console.log(e);
        next(e);
    }
};

module.exports.updateNote = async (req, res, next) => {
    const files = req.files;
    const payload = req.body;
    const id = req.params.id;
    const {fileNames} = _.pick(payload, 'fileNames');
    try {
        const savedFiles = await pathsToFiles(files);
        const data = await preparingData(payload, savedFiles, id);
        const createdContest = await Contest.create(data);
        res.send({
            contest: createdContest.dataValues
        });
    } catch (e) {
        console.log(e);
        next(e);
    }
};

module.exports.deleteNote = async (req, res, next) => {
    const files = req.files;
    const payload = req.body;
    const id = req.params.id;
    const {fileNames} = _.pick(payload, 'fileNames');
    try {
        const savedFiles = await pathsToFiles(files);
        const data = await preparingData(payload, savedFiles, id);
        const createdContest = await Contest.create(data);
        res.send({
            contest: createdContest.dataValues
        });
    } catch (e) {
        console.log(e);
        next(e);
    }
};

module.exports.getNote = async (req, res, next) => {
    const files = req.files;
    const payload = req.body;
    const id = req.params.id;
    const {fileNames} = _.pick(payload, 'fileNames');
    try {
        const savedFiles = await pathsToFiles(files);
        const data = await preparingData(payload, savedFiles, id);
        const createdContest = await Contest.create(data);
        res.send({
            contest: createdContest.dataValues
        });
    } catch (e) {
        console.log(e);
        next(e);
    }
};