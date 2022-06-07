import React from "react";


const  ApiService = async () => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=4a4472922ec446302808be760563492d&query=return&page=1`
  const res = await fetch(url);
  return res.json()
};
export default ApiService