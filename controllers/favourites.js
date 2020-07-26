const User = require('../models/users');
const { query } = require('express');

exports.getFavourites = async (req, res, next) => {
    try {
        const { email } = req.body;
        const userFavourites = await User.find({ email: email });
        return res.status(200).json({
            success: true,
            favouritesId: userFavourites
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
        await User.create(req.body);
        return res.status(200).json({
            success: true,
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

exports.updateFavourites = async (req, res, next) => {
    try {
        const { favourites, email } = req.body;
        const result = await User.updateOne({ email: email }, { $set: {favourites: favourites } });

        return res.status(200).json({
            update: true,
            user: result
        })
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                update: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error: ' + err
            });
        }
    }
}