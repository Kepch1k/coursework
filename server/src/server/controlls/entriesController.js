const bcrypt = require('bcrypt');
const _ = require('lodash');
const fs = require('fs');
const {Contest, BankAccount, Entry} = require('../models/index');
const uniqid = require('uniqid');
const {sequelize} = require('../models');
const Op = sequelize.Op;

const pathToFile = async (files) => {
    try {
        let path = null;
        files.map(async (file) => {
            path = __dirname + '/../tmp/EntriesUpload/' + uniqid() + '_' + file.originalname;

            await fs.writeFile(path, file.buffer, (e) => {
            });
        });
        return path;
    } catch (e) {
    }
};

module.exports.createEntry = async (req, res, next) => {
    const {body, files, idUser} = req;

    const dataToCreate = {
        contestId: JSON.parse(body.id),
        userId: idUser,
        nickName: JSON.parse(body.nickName),
    };
    try {
        const savedFiles = await pathToFile(files);
        if (savedFiles) {
            dataToCreate['media'] = savedFiles;
        } else {
            dataToCreate['prospectiveText'] = JSON.parse(body.values)[0];
        }
        const createdEntry = await Entry.create(
            dataToCreate
        );
        if (createdEntry) {
            res.send("OK");
        }
    } catch (e) {
        res.send("FAILED");
    }
};

module.exports.changeStatus = async (req, res, next) => {
    const {body, params} = req;
    let transaction;
    try {
        transaction = await sequelize.transaction();
        if (body.action === "ACCEPT") {
            const result = await Entry.update(
                {status: body.action},
                {returning: true, where: {id: params.id}, transaction}
            );
            if (result) {
                const [, [newResult]] = result;
                const dataOnUpdate = newResult.dataValues;
                const [, [updatedContest]] = await Contest.update({
                        winner: dataOnUpdate.userId,
                        status: "Closed"
                    },
                    {returning: true, where: {id: dataOnUpdate.contestId}, transaction});

                const [, updatedEntries] = await Entry.update(
                    {status: "REJECT"},
                    {
                        returning: true,
                        where: {
                            contestId: dataOnUpdate.contestId,
                            id: {[Op.ne]: params.id}
                        }, transaction
                    }
                );
                updatedEntries.unshift(newResult);
                const entriesToSend = updatedEntries.map((item) => {
                    return item.dataValues;
                });
                if (updatedEntries) {
                    transaction.commit();
                } else {
                    transaction.rollback();
                }
                const objectToSend = {entry: entriesToSend, contest: updatedContest.dataValues};
                res.send(objectToSend)
            }
        } else {
            const result = await Entry.update(
                {status: body.action},
                {returning: true, where: {id: params.id}, transaction}
            );
            if (result) {
                transaction.commit();
                const [, [newResult]] = result;
                const dataOnUpdate = newResult.dataValues;
                res.send({entry: dataOnUpdate})
            } else {
                transaction.rollback();
            }
        }
    } catch (e) {
        transaction.rollback();
        console.log(e);
        next(e);
    }
};

