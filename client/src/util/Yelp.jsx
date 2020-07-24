import axios from "axios";

const apiKey =
  "";

const config = {
  headers: { Authorization: `Bearer ${apiKey}` },
};

const Yelp = {
    search(term, location, sortBy) {
    // try {
    //   const res = await axios.get(
    //     `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, config);
    //   console.log("done request");
    //   console.log(res.businesses);
    //   if (res.businesses) {
    //     console.log("in if statement");

    //     return res.businesses.map((business) => {
    //       return {
    //         id: business.id,
    //         imageSrc: business.image_url,
    //         name: business.name,
    //         address: business.location.address1,
    //         city: business.location.city,
    //         state: business.location.state,
    //         zipCode: business.location.zipCode,
    //         category: business.categories[0].title,
    //         rating: business.rating,
    //         reviewCount: business.review_count,
    //       };
    //     });
    //   }
    // } catch (err) {
    //   console.log("error in try/catch");
    //   console.log(err.response.data.error);
    // }
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}&locale=en_GB`, {
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    }).then((response) => {
        return response.json();
    }).then((jsonResponse => {
        if (jsonResponse.businesses) {
            return jsonResponse.businesses.map(business => {
                return {
                    id: business.id,
                    imageSrc: business.image_url,
                    name: business.name,
                    address: business.location.address1,
                    city: business.location.city,
                    state: business.location.state,
                    zipCode: business.location.zip_code,
                    category: business.categories[0].title,
                    rating: business.rating,
                    reviewCount: business.review_count
                }
            });
        }
    }))
  },
};
export default Yelp;
