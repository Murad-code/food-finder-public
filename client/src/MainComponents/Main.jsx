import React, { useState } from "react";

import axios from "axios";
import Yelp from "../util/Yelp";
import { SearchBar } from "./SearchBar/SearchBar";
import { Business } from "./Business/Business";
import { Header } from "./Header/Header";

export const Main = (props) => {
  const [business, setBusiness] = useState({
    businesses: [],
  });

  const searchYelp = async (term, location, sortBy) => {
    const res = await axios.post("/search", {
      term: term,
      location: location,
      sortBy: sortBy,
    });
    if (res) {
      setBusiness({ businesses: res.data });
    } else {
      console.log("businesses is empty");
    }
  };
  return (
    <>
      <Header setFavouritesStatus={props.setFavouritesStatus} />
      <SearchBar searchYelp={searchYelp} />
      <Business business={business.businesses} />
    </>
  );
};
