import React, { useState } from 'react';
import './App.scss';
import { LoginProvider } from './context/LoginState';
import { Main } from './MainComponents/Main';
import { Favourites } from './FavouritesComponents/Favourites';

function App() {
  const [favouritesPage, setFavouritesStatus] = useState(false)

  return (
    <div className="App">
      <LoginProvider >
        {favouritesPage ? <Favourites setFavouritesStatus={setFavouritesStatus} /> : <Main setFavouritesStatus={setFavouritesStatus} />}
      </LoginProvider>
      <footer>

      </footer>
    </div>
  );
}

export default App;
