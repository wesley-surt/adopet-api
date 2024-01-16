import bcrypt from "bcrypt";
import Animals from "../models/Animal.js";
import jwt from "jsonwebtoken";
import users from "../models/Users.js";
import { environment } from "../../environment/env.js";
import { validateField } from "../utils/validate-field.js";

const secret = environment.SECRET_KEY;

class UsersController {
    static login = async (req, res, next) => {
        const { email, password } = req.body;

        validateField(email, `Email is required - ${email}`, res);
        validateField(password, `Password is required - ${password}`, res);

        const user = await users.findOne({ email: email });
        if (user) await bcrypt.compare(password, user.password);

        try {
            const userId = user._id;
            const token = jwt.sign(
                {
                    id: user.id,
                },
                secret
            );
            if (user) {
                res.status(200).json({ token, userId });
                return next();
            }

            res.status(500).json({ message: "User not find." });
            return next();
        } catch (err) {
            res.status(500).json({ message: "Server error. Try again later" });
            return next();
        }
    };

    static register = async (req, res) => {
        const {
            email,
            name,
            password,
            confirmPassword,
            about,
            state,
            city,
            photo,
            telephone,
            cep,
        } = req.body;

        validateField(email, `Email is required - ${email}`, res);
        validateField(name, `ERROR: Name is required - ${name}`, res);
        validateField(name, `ERROR: Cep is required - ${name}`, res);
        validateField(
            password,
            `ERROR: Password is required - ${password}`,
            res
        );
        validateField(
            confirmPassword,
            `ERROR: Confirm Password is required - ${confirmPassword}`,
            res
        );

        const userExists = await users
            .findOne({ email: email })
            .then()
            .catch((err) => {
                res.status(400).json({
                    message: `ERROR: Please, use another email - ${userExists}`,
                    error: err.message,
                });
            });

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new users({
            email,
            name,
            password: passwordHash,
            about,
            state,
            city,
            photo,
            telephone,
            cep,
        });

        try {
            const result = await user.save();

            if (result) return res.status(200).json(result);
            else throw new Error(err);
        } catch (err) {
            res.status(200).json({ error: err.message });
        }
    };

    static update = async (req, res) => {
        const { user, id } = req.body;
        const { photo, name, city, about, telephone, state, cep } = user;

        try {
            users.findByIdAndUpdate(
                id,
                {
                    photo,
                    name,
                    city,
                    about,
                    telephone,
                    state,
                    cep,
                },
                { new: true, select: "-password" },
                (err, user) => {
                    if (err) {
                        throw new Error(err.message);
                    } else res.status(200).json(user);
                }
            );
        } catch (err) {
            console.log(err.message);
        }
    };

    static return = async (req, res) => {
        const id = req.params.id;

        await users
            .findById(id, "-password")
            .then((user) => res.status(200).json(user))
            .catch((err) => {
                res.status(404).json({
                    message: "User not found. " + err.message,
                });
            });
    };

    static exists = async (req, res, next) => {
        const { email } = req.body;
        validateField(email, "Email is required", res);

        const user = await users.findOne({ email: email });

        if (user) {
            res.status(200).json({ exists: true });
            return next();
        } else {
            res.status(404).json({});
            return next();
        }
    };

    static delete = async (req, res, next) => {
        let id = req.params.id;

        await Animals.find({ userId: id }, {})
            .then((animals) => {
                if (animals.length > 0)
                    animals.forEach((a) => {
                        const id = a._id;
                        Animals.findByIdAndDelete(id)
                            .then()
                            .catch((err) => {
                                throw new Error(err.message);
                            });
                    });
            })
            .catch((err) => {
                res.status(500).json(err.message);
                return next();
            });

        await users
            .findByIdAndDelete(id)
            .then((response) => {
                res.status(200).json(response);
                return next();
            })
            .catch((err) => {
                res.status(500).json(err.message);
                return next();
            });
    };
}

export default UsersController;
