import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";

import EditForm from "./Movies/EditForm"
import AddForm from "./Movies/AddForm"
import axios from "axios"

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  // Grabs movies from API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.log(err.response));
  }, [])

  // Adds movies to "Saved List"
  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      {/* // Routes to home page displaying all movies */}
      <Route exact path="/" render={props => <MovieList {...props} movies={movies} />} />
      {/* // Routes to individual card view */}
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} setMovies={setMovies} movies={movies} />;
        }}
      />
      {/* // Routes to Edit Form to modify movie info */}
      <Route path="/update-movie/:id" render={props => 
        <EditForm {...props} movies={movies} setMovies={setMovies} /> 
      }/>
      {/* // Routes to Add Form to add any movies to array of movies */}
      <Route path="/add-movie" render={props => 
        <AddForm {...props} setMovies={setMovies} movies={movies} /> 
      }/>
    </>
  );
};

export default App;
