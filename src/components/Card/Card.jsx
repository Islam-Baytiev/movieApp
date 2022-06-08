
import React from "react";

import "./Card.scss";


function Card({title,poster_path,release_date,overview, load }) {

    const urlImage = 'https://image.tmdb.org/t/p/w500';

    function visibleText(text)  {
        if (text.length > 200) {
            const newText = text.slice(0,200)
            const findIndex = newText.lastIndexOf(' ');
            return `${newText.slice(0,findIndex)}...`
        }
        else return text
    }

    return(
          <div className="movie__card">
              <img className="movie__image" src={`${urlImage}${poster_path}`}/>
              <ul className="movie__list">
                <li className="movie__list__title">{title}</li>
                <li className="movie__list__date">{release_date}</li>
                <li className="movie__list__genres">Заглушка</li>
                <li className="movie__list__text">{visibleText(overview)}</li>
              </ul>
          </div>
    )
}

export default Card