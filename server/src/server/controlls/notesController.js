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
        console.log(e);
        next(e);
    }
};

module.exports.updateNote = async (req, res, next) => {
    const {preparedData} = req;
    const {id} = req.params;
    console.log("\n\n\n payload",preparedData,"\n\n\n");
    try {
        const result = await Note.update(
            preparedData,
            {returning: true, where: {id}}
        );
        const [, [newResult]] = result;
        if (newResult) {
            res.send("has updated");
        } else {
            res.send(" error");
        }
       // res.send("OK");
    } catch (e) {
        console.log(e);
        next(e);
    }
};

module.exports.deleteNote = async (req, res, next) => {
    try{
        const {id} = req.params;
        await Note.destroy({
            returning: true,
            where: {
                id
            }
        });
        res.send("has deleted");
    }catch (e) {
        console.log("\n\n\n result",e,"\n\n\n");
        next(e);
    }

};

module.exports.getNote = async (req, res, next) => {
    const {idUser} = req;
    try {
        const foundedNotes = await Note.findAll({
            where: {userId:idUser},
            order: [['id', 'ASC']]
        });
        console.log("\n\n\n result",foundedNotes,"\n\n\n");
        const notesToSend = foundedNotes.map((e)=>{
           return e.dataValues;
        });
       // console.log(foundedNote);
        res.send({
            notes: notesToSend
        });
    } catch (e) {
        console.log(e);
        next(e);
    }
};