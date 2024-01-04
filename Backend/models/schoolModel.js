import mongoose from "mongoose";

const schoolSchema = mongoose.Schema({
    schoolName: {
        type: String,
        required: [true, "Please add school name"],
    },
    schoolPassword: {
        type: String,
        required: [true, "Please add school password"],
    },
});

const School = mongoose.model("School", schoolSchema);

export default School;
