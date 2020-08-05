const express = require('express');
const router = express.Router();

const { yelp, yelpId } = require('../controllers/yelp.js');
const { addFavourites, getFavourites, updateFavourites } = require('../controllers/favourites');

router
    .route('/favourites')
    .post(getFavourites)

router
    .route('/favourites/add')
    .post(addFavourites)

router
    .route('/favourites/update')
    .put(updateFavourites)

router
    .route('/search')
    .post(yelp)

router
    .route('/searchById')
    .post(yelpId)


module.exports = router;