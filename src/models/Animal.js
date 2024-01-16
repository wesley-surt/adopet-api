import mongoose from "mongoose";

const animalsSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        required: true,
        ref: "users",
    },
    characteristics1: { type: String, required: true },
    characteristics2: { type: String, required: true },
    measure: { type: String, required: true },
    photo: { type: String, required: true },
    state: { type: String, required: true },
    size: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    age: { type: String, required: true },
    cep: { type: String, required: true },
    about: { type: String },
    id: { type: String },
});

const animals = mongoose.model("animals", animalsSchema);

export default animals;
