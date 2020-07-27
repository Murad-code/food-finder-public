import React, { useState } from 'react';
import Yelp from './util/Yelp';
import axios from 'axios';
import './App.scss';

import { SearchBar } from './components/SearchBar/SearchBar';
import { Business } from './components/Business/Business';
import { Header } from './components/Header/Header';
import { LoginProvider } from './context/LoginState';

import { FavouritesHeader } from './favourites/Header';


function App() {

  const [business, setBusiness] = useState({
    businesses: []
  })

  const [favouritesPage, setFavouritesStatus] = useState(false)

  const searchYelp = async (term, location, sortBy) => {
    // const businesses = await Yelp.search(term, location, sortBy);
    // setBusiness({ businesses: businesses });

    const res = await axios.post('/search', {
      term: term,
      location: location,
      sortBy: sortBy
    })
    if (res) {
      setBusiness({ businesses: res.data });
    } else {
      console.log('businesses is empty');
    }
  }

  const Main = () => {
    return (
      <>
        <Header />
        <SearchBar searchYelp={searchYelp} />
        <Business business={business.businesses} />
      </>
    )
  }

  const Favourites = () => {
    return (
      <>
        <FavouritesHeader />
      </>
    )
  }

  return (
    <div className="App">
      <LoginProvider >
        {favouritesPage ? <Favourites /> : <Main />}
      </LoginProvider>
      <footer>

      </footer>
    </div>
  );
}

export default App;
