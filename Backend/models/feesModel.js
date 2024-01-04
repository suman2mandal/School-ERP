import mongoose from "mongoose";

const feesSchema = mongoose.Schema({
    studentClass: {
        type: Number,
        required: [true, "Please add class"],
    },
    feesAmount: {
        type: Number,
        required: [true, "Please add fees amount"],
    },
});

const Fees = mongoose.model("Fees", feesSchema);

export default Fees;
