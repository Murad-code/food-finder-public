import React, { useState, useContext } from "react";

import "./SearchBar.scss";
import { GoogleLogin } from "react-google-login";
import { LoginContext } from "../../context/LoginState";
import { useEffect } from "react";

export const SearchBar = (props) => {
  const { isLoggedIn, setLogIn, addProfileData } = useContext(
    LoginContext
  );

  useEffect(() => {
    if (isLoggedIn) {
      document.getElementById('GoogleBtn').style.display='none';
    } else {
      document.getElementById('GoogleBtn').style.display='block';
    }
  }, [isLoggedIn])

  const [state, setState] = useState(() => {
    return {
      term: "",
      location: "",
      sortBy: "best_match",
    };
  });

  const sortByOptions = {
    "Best Match": "best_match",
    "Highly Rated": "rating",
    "Mostly Reviewed": "review_count",
  };

  const getSortByClass = (sortByOption) => {
    if (state.sortBy === sortByOption) {
      return "active";
    } else {
      return "";
    }
  };

  const RenderSortByOptions = () => {
    // console.log("function called");
    return Object.keys(sortByOptions).map((sortByOption) => {
      let sortByOptionValue = sortByOptions[sortByOption];
      // console.log("sortByOption: " + sortByOption);
      return (
        <li
          className={getSortByClass(sortByOptionValue)}
          onClick={() => handleSortByChange(sortByOptionValue)}
          key={sortByOptionValue}
        >
          {sortByOption}
        </li>
      );
    });
  };

  function handleSortByChange(sortByOptionValue) {
    console.log("handle called");
    setState({ ...state, sortBy: sortByOptionValue });
  }

  const handleTermChange = (event) => {
    setState({ ...state, term: event.target.value });
  };

  const handleLocationChange = (event) => {
    setState({ ...state, location: event.target.value });
  };

  const handleSearch = (event) => {
    if (state.location === "") {
      // Make popover active
    }
    props.searchYelp(state.term, state.location, state.sortBy);
    document.getElementById("arrows").style.display = "flex";
    event.preventDefault();
  };

  const removeLoading = () => {
    document.getElementById("arrows").style.display = "none";
  };

  const responseGoogle = (response) => {
    setLogIn(true);
    const Obj = response.profileObj;
    addProfileData(Obj.name, Obj.email, Obj.imageUrl);
  };

  const failResponseGoogle = (response) => {
    console.log("Not working failResponseGoogle called");
  };

  return (
    <div className="Main">
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            <RenderSortByOptions />
          </ul>
        </div>
        <form onSubmit={handleSearch}>
          <div className="SearchBar-fields">
            <input
              onChange={(event) => {
                handleTermChange(event);
                removeLoading();
              }}
              placeholder="Search Businesses"
              required
            />
            <input
              onChange={(event) => {
                handleLocationChange(event);
                removeLoading();
              }}
              placeholder="Where?"
              required
            />
          </div>

          <GoogleLogin
            clientId="798039512996-obn26l7bb3k8fdfig60f2u0h5nb871n5.apps.googleusercontent.com"
            render={(renderProps) => (
              <div
                id="GoogleBtn"
                className="GoogleBtn"
                onClick={renderProps.onClick}
              >
                <span className="icon"></span>
                <span className="buttonText">Sign in with Google</span>
              </div>
            )}
            onSuccess={responseGoogle}
            onFailure={failResponseGoogle}
            theme="dark"
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
          />
          <button type="submit" className="Submit-Button">
            Let's Go
          </button>
        </form>
      </div>
      <div id="arrows" className="box">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};
