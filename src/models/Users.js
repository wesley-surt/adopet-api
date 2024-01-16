import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    password: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    telephone: { type: String },
    photo: { type: String },
    city: { type: String },
    state: { type: String },
    about: { type: String },
    cep: { type: String },
    id: { type: String },
});

const users = mongoose.model("user", userSchema);

export default users;
