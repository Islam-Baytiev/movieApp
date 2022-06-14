import React from "react";
import RatedMovie from "../RatedMovie";

const Rated = () => {

  const getMovies =  () => {
    if(localStorage.getItem('selectedMovies') === null) {
      return
    }
    const movies =  JSON.parse(localStorage.getItem('selectedMovies'))
    return movies
  }

  const moviesRate = getMovies()
  const value = Object.values(moviesRate)
  console.log(value)
  const newArr = value.map((el)=>el.data.title)
  return(
      <>
        {value?.map((movie) => (
            <RatedMovie title={movie.data.title}
                        poster_path={movie.data.poster_path}
                        release_date={movie.data.release_date}
                        overview={movie.data.overview}
                        vote_average={movie.data.vote_average}
                        genres={movie.data.genres}
                        id={movie.data.id}
                        getMovies={getMovies}/>
        ))}
      </>


  )


}
export default Rated