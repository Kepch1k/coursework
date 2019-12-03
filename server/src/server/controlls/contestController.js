const _ = require('lodash');
const fs = require('fs');
const {Contest, BankAccount, Entry, User} = require('../models/index');
const uniqid = require('uniqid');
const {sequelize} = require('../models');

const pathsToFiles = async (files) => {
    try {
        const pathsForFiles = [];
        files.map(async (file) => {
            const path = __dirname + '/../tmp/ContestUpload/' + uniqid() + '_' + file.originalname;
            pathsForFiles.push(path);
            await fs.writeFile(path, file.buffer, (e) => {
            });
        });
        return pathsForFiles;
    } catch (e) {
    }
};

const preparingData = async (payload, pathsForFiles, id) => {
    try {
        const data = {userId: id};
        const props = await Object.keys(payload);
        for (let key in payload) {
            if (props.includes(key)) {
                data[key] = await JSON.parse(payload[key])
            }
        }
        data['media'] = pathsForFiles;
        return data;
    } catch (e) {
    }

};

const deleteOldFiles = async (pathsForFiles) => {
    try {
        pathsForFiles.forEach(function (item) {
            fs.unlink(item, (e) => {
            });
        });
    } catch (e) {

    }
};

module.exports.createContest = async (req, res, next) => {
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

module.exports.updateContest = async (req, res, next) => {
    const files = req.files;
    const payload = req.body;
    const id = req.params.id;

    try {
        const savedFiles = await pathsToFiles(files);
        const media = await JSON.parse(payload['media']);
        await deleteOldFiles(media);
        const data = await preparingData(payload, savedFiles, id);
        const [, [updatedContest]] = await Contest.update(data, {returning: true, where: {id: data.id}});
        res.send({
            contest: updatedContest.dataValues
        });
    } catch (e) {
        next(e);
    }
};
module.exports.payment = async (req, res, next) => {
    const payload = req.body;
    const [id] = payload.ids;
    let transaction;
    try {
        transaction = await sequelize.transaction();

        const updatedUserBalance = await BankAccount.update(
            {balance: sequelize.literal('balance  - ' + payload.amountPayable)},
            {returning: true, where: {number: payload.number}, transaction}
        );

        const updatedSiteBalance = await BankAccount.update(
            {balance: sequelize.literal('balance  + ' + payload.amountPayable)},
            {returning: true, where: {number: '7777777777777777'}, transaction}
        );

        if (updatedUserBalance && updatedSiteBalance) {
            await Contest.update(
                {status: 'Active'},
                {returning: true, where: {id: id}, transaction}
            );

        } else {
            next({status: 400, message: 'Transaction failed'});
        }
        transaction.commit();
        res.send({
            status: "Successful"
        });
    } catch (e) {
        transaction.rollback();
        next(e);
    }
};

module.exports.receiveContests = async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await Contest.findAll({where: {userId: id}});
        res.send(result)
    } catch (e) {
        next(e);
    }
};

module.exports.receiveContestById = async (req, res, next) => {
    const {id} = req.params;
    const {idUser} = req;
    try {
        const contest = await Contest.find({
            attributes: {include: ['"Contest".*', [sequelize.fn('count', sequelize.col('Entries.contestId')), 'numberOfEntries']]},
            include: [
                {
                    model: Entry,
                    attributes: [],
                },
            ],
            where: {id: id},
            group: ['Contest.id'],
        });
        if (contest) {
            if (contest.winner) {
                const {dataValues} = await User.find({
                    where: {
                        id: contest.winner
                    }
                });
                contest.winner = dataValues.displayName;
            }
            if (contest.userId === idUser) {
                const entries = await Entry.findAll({
                    where: {contestId: id},
                });
                if (entries) {
                    res.send({contest: contest, entries: entries})
                }
            } else {
                res.send({contest: contest, entries: null})
            }
        }
    } catch (e) {
        console.log(e);
        next(e);
    }
};


module.exports.receiveFilterContests = async (req, res, next) => {
    try {
        const {contestFilter} = req;

        const contests = await Contest.findAll({
            attributes: {include: ['"Contest".*', [sequelize.fn('count', sequelize.col('Entries.contestId')), 'numberOfEntries']]},
            include: [
                {
                    model: Entry,
                    attributes: [],
                }
            ],
            where: contestFilter,
            group: ['Contest.id'],
            order: [['updatedAt', 'ASC']]
        });
        if (contests) {
            res.send(contests)
        }
    } catch (e) {
        console.log(e);
        next(e);
    }
};


module.exports.deleteContest = async (req, res, next) => {
    const id = req.params.id;
    const userId = req.body.userId;
    try {
        const result = await Contest.find({where: {id: id}});
        if (result) {
            const smt = await Contest.destroy({
                returning: true,
                where: {id: id}
            });

            if (smt === 1) {
                res.send(result)
            }
        }
    } catch (e) {
        console.log(e);
        next(e);
    }
};