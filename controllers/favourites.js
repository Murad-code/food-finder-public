const User = require('../models/users');

exports.getFavourites = async (req, res, next) => {
    try {
        const { email } = req.body;
        const userFavourites = await User.find({ email: 'murad.coding@gmail.com'}, 'email favourites');
        return res.status(200).json({
            success: true,
            data: userFavourites
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error: ' + err
        })
    }
}

exports.addFavourites = async (req, res, next) => {
    // Need to have a check for if there is a record for the current email. If so, map through array and add new values to it
    try {
        const { favourites, email } = req.body;
        const userCreated = await User.create(req.body);

        return res.status(201).json({
            success: true,
            data: userCreated
        })
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}