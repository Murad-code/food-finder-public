const express = require('express');
const router = express.Router();

const { yelp } = require('../controllers/yelp.js');
const { addFavourites, getFavourites } = require('../controllers/favourites');

router
    .route('/favourites')
    .post(getFavourites)

router
    .route('/favourites/add')
    .post(addFavourites)

// This is Yelp route, leave it
router
    .route('/search')
    // .post(testing);
    .post(yelp)


module.exports = router;