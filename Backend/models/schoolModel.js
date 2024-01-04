// This will be only for the use of web app owner -- Owner will decide the school name and a password 
const mongoose = require("mongoose")

const schoolSchema = mongoose.Schema({
    schoolName: {
        type: String,
        required: [true, "Please add school name"]
    },
    schoolPassword: {
        type: String,
        required: [true, "Please add school password"]
    }
})

const School = mongoose.model("School", schoolSchema)
module.exports = School