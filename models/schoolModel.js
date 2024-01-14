import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const schoolSchema = mongoose.Schema({
    schoolId: {
        type: String,
        required: [true, "Please add school id"],
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


