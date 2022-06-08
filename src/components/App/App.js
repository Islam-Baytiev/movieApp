import React, { useEffect, useState} from "react";
import './App.css'
import ApiService from "../Api/ApiService";
import Card from "../Card/Card";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";

function App()  {

  const [movies,setMovies] = useState();
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  function onError(err) {
    console.log(123)
    setIsError(true)
    setIsLoading(false)
  }

  const getResource =  () => {
    return ApiService().then(res => {
        setMovies(res)
        setIsLoading(false)
    }).catch(onError)
  }


  useEffect( () => {
    getResource()
  }, [])


  return (
      <>
        <section className="container">
          <div className="movie" >
            {isLoading === true ?
                <Spinner isLoading={isLoading} />
                :
                <>{movies?.results.map(el => <Card load = {isLoading} {...el}/>)}</>
            }
          </div>
        </section>
      </>
  );
}

export default App


