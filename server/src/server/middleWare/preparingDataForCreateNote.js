const {FIELD_FOR_CREATE_NOTE_TO_REPLACE} = require('../utils/Consts');
const _ = require("lodash");

module.exports.prepare = async (req, res, next) => {
    try {
        const payload = req.body;
        console.log("\n\n\n",_.keys(FIELD_FOR_CREATE_NOTE_TO_REPLACE),"\n\n\n");
        const neededField = _.pick(payload,_.keys(FIELD_FOR_CREATE_NOTE_TO_REPLACE));
        //console.log("\n\n\n",FIELD_FOR_CREATE_NOTE_TO_REPLACE.keys,"\n\n\n");
        const userId = req.idUser;
        const preparedData = {userId};
        for(let key in neededField){
            preparedData[FIELD_FOR_CREATE_NOTE_TO_REPLACE[key]]=neededField[key];
        }
        req.preparedData=preparedData;
        next();
    } catch (e) {
        console.log("\n\n\n error",e,"\n\n\n");
        next({status: 403, message: "Your session ended. Please re login."})
    }
};

