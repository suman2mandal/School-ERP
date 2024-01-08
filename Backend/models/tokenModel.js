import mongoose from "mongoose"


const tokenSchema = mongoose.Schema({
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "School"
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true
    }
})

// Exporting token with the help of a variable
const Token = mongoose.model("Token", tokenSchema)
export default Token