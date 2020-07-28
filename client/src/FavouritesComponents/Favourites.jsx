import React from "react";

import { FavouritesHeader } from './Header/Header';


export const Favourites = (props) => {
  return (
    <div>
      <FavouritesHeader setFavouritesStatus={props.setFavouritesStatus} />
    </div>
  );
};
