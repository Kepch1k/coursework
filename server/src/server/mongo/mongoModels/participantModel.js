const  mongoose  = require("mongoose");
const  {Schema}  =  mongoose;
module.exports = mongoose.model("Participant", new Schema(
    {
        message: {
            type: String
        },
        sender: {
            type: String
        }
    },
    {
        timestamps: true
    })
);
