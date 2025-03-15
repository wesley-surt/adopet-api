export const validateField = (field, message, res) => {
    try {
        if (!field) {
            res.status(422).json({ message: message });
            return;
        }

        return;
        
    } catch (err) {
        console.log(err.message);
    }
};
