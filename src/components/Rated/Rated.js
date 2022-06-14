import React, {useEffect, useState} from "react";
import RatedMovie from "../RatedMovie";

const Rated = () => {
  const [movieRate, setMovieRate] = useState([])
  const getMovies =  () => {
    if(localStorage.getItem('selectedMovies') === null) {
      throw new Error('err')
    }
    const movies =  JSON.parse(localStorage.getItem('selectedMovies'))
    return movies
  }
  useEffect(()=>{
    try {
      const moviesRate = getMovies()
      setMovieRate(Object.values(moviesRate))
    }
    catch (err) {
      return
    }
  },[])

  return(
    <>
      {movieRate?.map((movie) => (
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