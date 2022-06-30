import React, { useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios';
import { Pagination, Input, Tabs, Alert } from 'antd';
import debounce from 'lodash.debounce';

import Card from '../Card/Card';
import Error from '../Error/Error';
import Spinner from '../Spinner/Spinner';
import { Provider } from '../../Context/Context';
import Rated from '../Rated/Rated';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [genres, setGenres] = useState(null);
  const { TabPane } = Tabs;

  const fetchMovie = async (query, page) => {
    return await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=4a4472922ec446302808be760563492d&query=${query}&page=${page}`
    );
  };

  const genresMovie = async () => {
    const { data } = await axios.get(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=4a4472922ec446302808be760563492d&language=en-US'
    );
    return data;
  };
  useEffect(() => {
    genresMovie().then((response) => {
      setGenres(response);
    });
  }, []);
  useEffect(() => {
    if (query.length !== 0) {
      setIsLoading(true);
      (async () => {
        try {
          const response = await fetchMovie(query, page);

          setMovies(response.data.results);
          setTotal(response.data.total_results);
          setIsLoading(false);
        } catch {
          setIsError(true);
          setIsLoading(false);
        }
      })();
    }
  }, [query, page]);

  const changePage = (page) => {
    setPage(page);
  };
  const onChangeRate = async (id, rate) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}}?api_key=4a4472922ec446302808be760563492d`
    );
    if (localStorage.getItem('selectedMovies') === null) {
      const movies = JSON.stringify([]);
      localStorage.setItem('selectedMovies', movies);
    }

    const movies = JSON.parse(localStorage.getItem('selectedMovies'));
    let newMovies = {
      ...movies,
      [data.id]: {
        data,
        rate,
      },
    };
    localStorage.removeItem('selectedMovies');
    newMovies = JSON.stringify(newMovies);
    localStorage.setItem('selectedMovies', newMovies);
  };

  const requestMovies = (event) => {
    if (event.target.value.trim().length === 0) return;
    setQuery(event.target.value);
    setIsLoading(true);
  };
  return (
    <Provider value={genres}>
      <section className="container">
        <Tabs className="movie" style={{ padding: 36 }} defaultActiveKey="1" centered destroyInactiveTabPane>
          <TabPane tab="Search" key={1}>
            <div className="movie">
              <Input
                className="searchInput"
                style={{ height: 40 }}
                size="large"
                onKeyUp={debounce(requestMovies, 2000)}
                placeholder="Type to search"
              />
              <div style={{ margin: '0 auto' }}>
                {total === 0 ? <Alert message="По вашему запросу ничего не найдено" type="success" /> : null}
                {isError === true ? <Error error={isError} /> : null}
              </div>
              {isLoading ? (
                <div className="movie__spin">
                  <Spinner style={{}} isLoading={isLoading} />
                </div>
              ) : (
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <>
                  {movies.map((el) => (
                    <Card key={el.id} onChangeRate={onChangeRate} load={isLoading} error={isError} {...el} />
                  ))}
                </>
              )}
            </div>
            <Pagination
              className="paginate"
              total={total}
              showSizeChanger={false}
              pageSize={20}
              onChange={changePage}
              hideOnSinglePage
              responsive
            />
          </TabPane>
          <TabPane tab="Rated" key={2}>
            <div className="movie">
              <Rated genres={genres} />
            </div>
          </TabPane>
        </Tabs>
      </section>
    </Provider>
  );
};

export default App;
