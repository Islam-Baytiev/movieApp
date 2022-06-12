import React, { useEffect, useState} from "react";
import './App.css'
import Card from "../Card/Card";
import Spinner from "../Spinner/Spinner";
import axios from "axios";
import { Row, Col, Input } from 'antd';
import Error from "../Error/Error";


function App()  {

  const [movies,setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)


  useEffect( () => {
    const fetchMovie = async () => {
      try {
        const {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=4a4472922ec446302808be760563492d&query=return&page=1`);
        return data
      }
      catch (err) {
        setIsError(true)
      }
      finally {
        setIsLoading(false)
      }
    }
    fetchMovie().then(response => setMovies(response))

  }, [])

  return (
      <Row>
        <Col span={16} offset={4}
             style={{paddingTop: 80, paddingBottom: 36}}>
          {isLoading === true ?
              <Spinner isLoading={isLoading} />
              :
              <>{movies?.results.map(el => <Card load = {isLoading} {...el}/>)}</>
          }
        </Col>
      </Row>

  );
}

export default App


/*      <>
        <section className="container">
          <div className="movie" >

          </div>
        </section>
      </>*/