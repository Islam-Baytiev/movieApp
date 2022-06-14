import React from "react";
import "./Card.scss";
import {Rate} from "antd";
import {Consumer} from "../Context/Context";
import {Image} from "antd";
import posterError from './posterError.jpg'

function Card({id,title,poster_path,release_date,overview, vote_average, genre_ids, onChangeRate }) {

  const urlImage = 'https://image.tmdb.org/t/p/w500';
  let voteColor ;
  function visibleText(text)  {
      if (text.length > 150) {
          const newText = text.slice(0,150)
          const findIndex = newText.lastIndexOf(' ');
          return `${newText.slice(0,findIndex)}...`
      }
      else return text
  }

  if (vote_average < 3) voteColor = '#E90000'
  else if (vote_average >= 3 && vote_average < 5) voteColor = '#E97E00'
  else if (vote_average >= 5 && vote_average < 7) voteColor = '#E9D100'
  else voteColor = '#66E900'
  const onHandleChangeRate = (value) => {
    onChangeRate(id, value)
  };

    const cardElement = () => {
      return (
          <Consumer>
            {
              (genres) => {
                const genresNames = genres?.genres.map(genre => {
                  if (genre_ids.includes(genre.id)) {
                    return genre.name
                  }
                } )
                return (
                    <>
                      <Image className="movie__image" src={poster_path? `${urlImage}${poster_path}` : posterError} />
                      <div className="movie__div">
                        <ul className="movie__list">
                          <li className="movie__list__title">{title}</li>
                          <li className="movie__list__date">{release_date}</li>
                          {genresNames.map((genre, index) => {
                            if ( genre !== undefined) {
                              return (
                                  <li key={index} className="movie__list__genres">{genre}</li>
                              )
                            }
                          }
                          )}
                          <li className="movie__list__text">{visibleText(overview)}</li>
                        </ul>
                        <Rate onChange={onHandleChangeRate} className="movie__rate"  count={10} style={{fontSize: 15}} />
                      </div>
                      <div style={{borderColor: voteColor}} className='movie__circle'>{vote_average}</div>
                    </>
                )
              }
            }
          </Consumer>
      )
  }
    return(
      <div className="movie__card">
       <>{cardElement()}</>
      </div>
    )
}

export default Card