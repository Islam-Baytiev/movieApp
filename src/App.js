import React, {useEffect, useState} from "react";
import ApiService from "./components/Api/ApiService";
import Card from "./components/Card/Card";

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  const  getResource =  () => {
    return ApiService().then(res => {
      setMovies([...movies,res])
      setIsLoading(!isLoading)
    })
  }

  useEffect(()=> {
    getResource()
  },[])

  return (
      <section className="container"> {movies.map(el => <Card {...el.results}/>)} </section>
  );
}

export default App


