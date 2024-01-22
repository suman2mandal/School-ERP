import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const schoolSchema = mongoose.Schema({
    schoolName: {
        type: String,
        required: [true, "Please add school name"],
    },
    schoolLocation: {
        type: String,
        required: [true, "Please add school location"],
    },
    schoolEstablished: {
        type: Date,
        required: [true, "Please add school established date"],
    },
    schoolPassword: {
        type: String,
        required: [true, "Please add school password"],
    },
});

schoolSchema.pre("save", async function (next) {
    if (!this.isModified("schoolPassword")) {
        return next()
    }
    const passwordSalt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.schoolPassword, passwordSalt)
    this.schoolPassword = hashedPassword
})

const School = mongoose.model("School", schoolSchema);

export default School;


