export const validateField = (field, message, res, next) => {
    try {
        if (!field) {
            res.status(422).json({ message: message });
            return;
        }
        return true;
    } catch (err) {
        console.log(err.message);
    }
};
