const  mongoose  = require("mongoose");
const  {Schema}  =  mongoose;
const {ObjectId} = mongoose.Schema.Types;
module.exports = mongoose.model("Message", new Schema(
    {
        message: {
            type: String
        },
        sender: {
            type: String
        },

    },
    {
        timestamps: true
    })
);

/*

 type: 'ObjectId', ref: 'Person' }

 */
