import React, { useState } from 'react';
import './App.scss';
import { LoginProvider } from './context/LoginState';
import { Main } from './MainComponents/Main';
import { Favourites } from './FavouritesComponents/Favourites';
import ReactNotification from "react-notifications-component";

function App() {
  const [favouritesPage, setFavouritesStatus] = useState(false)

  return (
    <div className="App">
      <ReactNotification />
      <LoginProvider >
        {favouritesPage ? <Favourites setFavouritesStatus={setFavouritesStatus} /> : <Main setFavouritesStatus={setFavouritesStatus} />}
      </LoginProvider>
      <footer>

      </footer>
    </div>
  );
}

export default App;
