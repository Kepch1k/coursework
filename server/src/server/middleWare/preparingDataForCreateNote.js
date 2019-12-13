const {FIELD_FOR_CREATE_NOTE_TO_REPLACE} = require('../utils/Consts');

module.exports.prepare = async (req, res, next) => {
    try {
        const payload = req.body;
        const userId = req.idUser;
        const preparedData = {userId};
        for(let key in payload){
            preparedData[FIELD_FOR_CREATE_NOTE_TO_REPLACE[key]]=payload[key];
        }
        req.preparedData=preparedData;
        next();
    } catch (e) {
        next({status: 403, message: "Your session ended. Please re login."})
    }
};

