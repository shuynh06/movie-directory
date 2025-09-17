import './App.css';
import Top from './webParts/Top.js';
import EpisodeInformation from './webParts/episodeInformation.js';
import React, { useState, useEffect } from 'react';


function App() {
  const [showTitle, setShowTitle] = useState('');
  const [season, setSeason] = useState('');
  const [seasonTotal, setSeasonTotal] = useState('');
  const [episode, setEpisode] = useState('');

  const [episodeTitle, setEpisodeTitle] = useState('');
  const [genres, setGenres] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [runTime, setRunTime] = useState('');
  const [plot, setPlot] = useState('');
  const [rating, setRating] = useState('');
  const [imageURL, setImageURL] = useState('');

  const fetchAPI = () => {
    let baseUrl = "https://www.omdbapi.com/"
    let APIKey = "60f9d8a6"
    let url = baseUrl + "?t=" + showTitle.replace(/ /g, "+") + "&apikey=" + APIKey;
    
    if (season) {
      if (episode) {
        url = url + '&Season=' + season + '&Episode=' + episode
      } else {
        url = url + '&Season=' + season
      }
    } 

    console.log("url:" + url)
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setEpisodeTitle(json.Title)
        setGenres(json.Genre)
        setReleaseDate(json.Released)
        setRunTime(json.Runtime)
        setPlot(json.Plot)
        setRating(json.imdbRating)
        setImageURL(json.Poster)

        if (!episode) {
          setSeasonTotal(json.totalSeasons)
        }
      });
  }

  useEffect(() => {
    if (showTitle) {
      fetchAPI();
    }
  }, [showTitle, fetchAPI]);

  

  
  return (
    <div>
      <Top setter = {{setShowTitle}} seasonTotal = {seasonTotal}/>
      <EpisodeInformation 
        title = {episodeTitle}
        genres = {genres}
        releaseDate = {releaseDate}
        runTime = {runTime}
        plot = {plot}
        rating = {rating}
        poster = {imageURL}
      />
    </div>
  );
}

export default App;
