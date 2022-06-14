import React, { useEffect, useState} from "react";
import './App.css'
import Card from "../Card/Card";
import Error from "../Error/Error";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import {Pagination, Input, Tabs, Alert, Rate} from "antd";
import {Provider} from "../Context/Context";
import Rated from "../Rated/Rated";
import Paginate from "../Paginate/Pagination";



 const App = () => {

  const [movies,setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [total, setTotal] = useState(null)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('return')
  const [genres, setGenres] = useState(null)
  const {TabPane} = Tabs
  const debounce = require('lodash.debounce');

  useEffect( () => {
    setIsLoading(true)
    const fetchMovie = async () => {
      try {
        const {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=4a4472922ec446302808be760563492d&query=${query}&page=${page}`);
        setIsError(false)
        return data
      }
      catch (err) {
        setIsError(true)
      }
      finally {
        setIsLoading(false)
      }
    }
    const genresMovie = async () => {
      const {data} = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=4a4472922ec446302808be760563492d&language=en-US');
      return data
    }
    //Искуственная задержка для демонстрации спинера
    setTimeout(()=> {
      fetchMovie().then(response => {
        setMovies(response)
        setTotal(response.total_results)
      })
    }, 1000)
    genresMovie().then(response => {
      setGenres(response)
    })
  }, [page,query])

  const changePage = (page) => {
    setPage(page)
  }

  const onChangeRate = async (id, rate) => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}}?api_key=4a4472922ec446302808be760563492d`);
    if(localStorage.getItem('selectedMovies') === null) {
      const movies = JSON.stringify([])
      localStorage.setItem('selectedMovies', movies)
    }
    const movies = JSON.parse(localStorage.getItem('selectedMovies'))
    let newMovies = {
      ...movies,
      [data.id]: {
        data,
        rate
      }
    }
    localStorage.removeItem('selectedMovies')
    newMovies = JSON.stringify(newMovies)
    localStorage.setItem('selectedMovies', newMovies)
   };


  const requestMovies = (event) => {
    if (event.target.value.trim().length === 0) return
    setQuery(event.target.value)
    setIsLoading(true)
  }

  return (
      <Provider value={genres}>
          <section className="container">
            <Tabs className="movie" style={{padding:36}} defaultActiveKey="1" centered destroyInactiveTabPane>
              <TabPane tab="Search" key={1}>
                <div className="movie" >
                  <Input className="searchInput" style={{height: 40}} size="large" onKeyUp={debounce(requestMovies, 2000)} placeholder="Type to search"/>
                  <div style={{margin:'0 auto' }}>
                    {total === 0 ? <Alert message="По вашему запросу ничего не найдено" type="success" /> : null}
                    {isError === true ? <Error error={isError}/> : null}
                  </div>
                  {isLoading === true ? <div className="movie__spin">
                    <Spinner style={{}} isLoading={isLoading}/></div>:<>{movies?.results.map((el, index) => <Card key = {index} onChangeRate={onChangeRate} load = {isLoading} error={isError} {...el}/>)}</>}
                </div>
                <Pagination className="paginate"  total={total} showSizeChanger={false}
                            pageSize={20} onChange={changePage}  hideOnSinglePage responsive/>
              </TabPane>
              <TabPane tab="Rated" key={2}>
                <div className="movie">
                  <Rated genres={genres}/>
                </div>
              </TabPane>
            </Tabs>
          </section>
      </Provider>
  );
}

export default App

