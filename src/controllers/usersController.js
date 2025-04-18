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

        await users.findOne({ email: email }).then( async (user) => {

            let passwordValidit = false;
            if (user != null && user != undefined) {

                passwordValidit = await bcrypt.compare(password, user.password)

                if(!passwordValidit) {
                    res.status(400).json({Error: "Incorrect password"});
                    next();
                    return;
                }
    
            } else {

                res.status(400).json({Error: "User not found"});
                next();
                return;
            };

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
                    next();
                    return;
                }
    
                res.status(500).json({ message: "User not find." });
                next();
                return;
    
            } catch (err) {

                res.status(500).json({ message: "Server error. Try again later dentro" });
                next();
                return;
            }

        }).catch(err => {

            res.status(500).json({Error: "Server error. Try agin leter fora"});
            next();
            return;
        });    
    };

    static register = async (req, res, next) => {

        const {
            confirmPassword,
            password,
            email,
            name,
        } = req.body;

        validateField(email, `Email is required - ${email}`, res);
        validateField(name, `ERROR: Name is required - ${name}`, res);
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

        await users
            .findOne({ email: email })
            .then( async (response) => {
                
                if (response !== null && response !== undefined) {

                    res.status(400).json({
                        Email_exists: "ERROR: Please, use another email",
                    });
                    next();

                }
                else {
                    
                    const salt = await bcrypt.genSalt(12);
                    const passwordHash = await bcrypt.hash(password, salt);
                    const user = new users({
                        password: passwordHash,
                        email,
                        name,
                    });

                    try {            
                        await user.save()
                            .then(result => res.status(200).json(result))
                            .catch(err => { throw new Error(err) });
            
                    } catch (err) {
                        res.status(500).json({ error: err.message });
                        next();
                    }
                }
            })
            .catch((err) => {

                res.status(500).json({
                    error: err.message
                });
            });
    };

    static update = async (req, res, next) => {

        const { user, id } = req.body;
        
        validateField(user, `User information is required - ${user}`, res);
        validateField(id, `User id is required - ${id}`, res);
        
        const { name, city, about, telephone, state, cep, email, photo} = user;
        try {
            users.findByIdAndUpdate(
                id,
                {
                    telephone,
                    about,
                    state,
                    photo,
                    email,
                    city,
                    name,
                    cep,
                },
                { new: true, select: "-password" },
                (err, user) => {
                    if (err) throw new Error(err.message);

                    if (user != null && user != undefined && user) {

                        res.status(200).json(user);
                        next();
                        return;

                    } else {

                        res.status(400).json({Error: "User not found. Check if the ID is correct and try again"});
                        next();
                        return;
                    };
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
            .then((user) => {

                if (user != null && user != undefined && user) {
                    res.status(200).json(user);
                    return;

                } else {

                    res.status(404).json({
                        message: "User not found. Check if the ID is correct and try again"
                    });

                    return;
                }
            })
            .catch((err) => {
                res.status(500).json({
                    Error: "Error: there was an error on the server." + err.message,
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

                        fetch(`http://localhost:4000/pictures/${a.photo}`, {
                            method: 'DELETE',
                        })

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
