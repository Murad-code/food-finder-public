const axios = require('axios')

const apiKey = process.env.YELP_API;

const config = {
    headers: { Authorization: `Bearer ${apiKey}` },
};

exports.testing = (req, res) => {
    return res.send('in router')
}

exports.yelp = async (req, res, next) => {
    try {
        const { term, location, sortBy } = req.body;
        const businesses = await axios.get(`https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}&locale=en_GB`, config)

        if (businesses.data) {
            console.log("in if statement");

            const results = await businesses.data.businesses.map((business) => {
                return {
                    id: business.id,
                    imageSrc: business.image_url,
                    name: business.name,
                    address: business.location.address1,
                    city: business.location.city,
                    zipCode: business.location.zip_code,
                    category: business.categories[0].title,
                    rating: business.rating,
                    reviewCount: business.review_count,
                };
            });

            return res.send(results);
        }
    } catch (err) {
        res.send().json({
            error: err
        });
        console.log('Error in catch: ' + err);
    }
}