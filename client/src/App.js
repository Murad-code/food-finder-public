import React, { useState } from 'react';
import './App.scss';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Business } from './components/Business/Business';
import { Header } from './components/Header/Header';
import { LoginProvider } from './context/LoginState';
import Yelp from './util/Yelp';
import axios from 'axios';

function App() {

  const [business, setBusiness] = useState({
    businesses: []
  })

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

  return (
    <div className="App">
      <LoginProvider >
        <Header />
        <SearchBar searchYelp={searchYelp} />
        <Business business={business.businesses} />
      </LoginProvider>
      <footer>

      </footer>
    </div>
  );
}

export default App;
