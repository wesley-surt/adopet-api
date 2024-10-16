import mongoose from "mongoose";

const partnershipSchema = mongoose.Schema({
    id: { type: String },
    NGOId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        required: true,
        ref: "users",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        required: true,
        ref: "users",
    },
});

const users = mongoose.model("partnership", partnershipSchema);

export default users;
