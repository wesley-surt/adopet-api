import animals from "../models/Animal.js";
import { validateField } from "../utils/validate-field.js";

export class AnimalsController {
    static getAllAnimals = async (req, res) => {
        try {

            const allAnimals = await animals.find();
            if (allAnimals) res.status(200).json(allAnimals);

        } catch (err) {

            res.status(500).json({
                message: "Server error",
                error: err.message,
            });
        }
    };

    static getAnimal = async (req, res) => {

        try {

            const { id } = req.params;
            await animals.findById(id)
                .then(animal => {
                    if (animal != null && animal != undefined && animal.length != 0)
                        res.status(200).json(animal);
                    else {
                        res.status(400).json({ Error: "No animal belonging to the provided user id were found. Verify that the user id is correct and try again." });
                    };
                });

        } catch (err) {

            res.status(404).json({
                message: "No animal found",
                error: err.message,
            });
        }
    };

    static exist = async (req, res) => {
        try {
            const { profileId } = req.params;
            await animals
                .find({ "profileId": profileId })
                .then((animal) => {
                    if (animal != null && animal != undefined && animal.length != 0)
                        res.status(200).json({ exist: true });
                    else {
                        res.status(400).json({ Error: "No animal belonging to the provided user id were found. Verify that the user id is correct and try again." });
                    };
                })
                .catch((err) => {
                    throw new Error(err.message);
                });

        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    };

    static searchByState = async (req, res) => {

        const { state } = req.query;
        animals
            .find({ state: state }, {})
            .then((animals) => {
                if (animals != null && animals != undefined && animals.length != 0)
                    res.status(200).json(animals);
                else {
                    res.status(400).json({ Error: "No animals belonging to the informed state were found. Verify that the state is correct and try again." });
                };
            })
            .catch((err) => res.status(500).json({ message: err }));
    };

    static searchByUserId = async (req, res) => {

        const { userId } = req.query;
        animals
            .find({ userId: userId }, {})
            .then((animals) => {
                if (animals != null && animals != undefined && animals.length != 0)
                    res.status(200).json(animals);
                else {
                    res.status(200).json({ Error: "No animals belonging to the provided user id were found. Verify that the user id is correct and try again." });
                };
            })
            .catch((err) => res.status(500).json({ message: err }));
    };

    static register = async (req, res) => {
        const { userId, animal } = req.body;
        validateField(userId, "UserId is required", res);
        validateField(animal, "Object animal is required", res);
        const {
            characteristics1,
            characteristics2,
            measure,
            photo,
            about,
            state,
            city,
            size,
            name,
            age,
            cep,
        } = animal;

        validateField(characteristics1, "Characteristics1 is required", res);
        validateField(characteristics2, "Characteristics2 is required", res);
        validateField(measure, "Measure is required", res);
        validateField(userId, "UserId is required", res);
        validateField(photo, "Photo is required", res);
        validateField(state, "State is required", res);
        validateField(city, "City is required", res);
        validateField(size, "Size is required", res);
        validateField(name, "Name is required", res);
        validateField(age, "Age is required", res);
        validateField(cep, "Cep is required", res);

        const animalToSave = new animals({
            characteristics1: characteristics1,
            characteristics2: characteristics2,
            measure: measure,
            userId: userId,
            photo: photo,
            state: state,
            about: about,
            city: city,
            name: name,
            size: size,
            age: age,
            cep: cep,
        });

        await animalToSave
            .save()
            .then((animal) => animal._id)
            .then((animal) => {
                animal._id
                    ? res.status(200).json(animal)
                    : res.status(500).json({ message: "Erro de processamento" });
                return;
            });
    };

    static deleteOne = (req, res) => {

        const { id } = req.params;
        animals
            .findByIdAndDelete(id)
            .then((animal) => {
                if (animal != null && animal != undefined && animal.length != 0)
                    res.status(200).json({ deleted: true });
                else {
                    res.status(400).json({ Error: "No animal belonging to the provided user id were found. Verify that the user id is correct and try again." });
                };
            })
            .catch((err) => res.status(500).json(err.message));
    };

    static deleteAll = async (req, res) => {

        const { userId } = req.query;
        let idsRefined = [];

        await animals
            .find({ profileId: userId })
            .then((animals) => {
                if (
                    animals != undefined &&
                    animals != null &&
                    animals.length != 0
                ) {
                    const regexToAnimalArray = new RegExp(
                        "_id:[a-zA-Z0-9]+,",
                        "g"
                    );

                    const regexToIdsArray = new RegExp("_id:");
                    const animalsParsedString = JSON.stringify(animals).replace(
                        /[\\"]/g,
                        ""
                    );

                    const ids = animalsParsedString.match(regexToAnimalArray);
                    for (let i = 0; i < ids.length; i++) {

                        const id = ids[i]
                            .replace(regexToIdsArray, "")
                            .replace(",", "");
                        idsRefined.push(id);
                    }

                } else {
                    return res.status(400).json([]);
                }
            })
            .catch((err) => {
                return res.status(500).json(err.message);
            });

        for (let i = 0; i < idsRefined.length; i++) {

            await animals
                .findByIdAndDelete(idsRefined[i])
                .then()
                .catch((err) => {
                    return res.status(500).json(err.message);
                });
        }

        res.status(200).json([]);
    };

    static update = (req, res) => {
        
        const { animal, id } = req.body;
        animals
            .findByIdAndUpdate(id, animal)
            .then((animal) => {
                if (animal != null && animal != undefined && animal.length != 0)
                    res.status(200).json(animal);
                else {
                    res.status(400).json({ Error: "No animal belonging to the provided user id were found. Verify that the user id is correct and try again." });
                };
            })
            .catch((err) => res.status(500).json({ message: err.message }));
    };
}

export default AnimalsController;
