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


  useEffect(() => {
    if (!showTitle) { return };

    let APIKey = "60f9d8a6";
    let baseUrl = "https://www.omdbapi.com/";
    let url = baseUrl + "?t=" + showTitle.replace(/ /g, "+") + "&apikey=" + APIKey;

    if (season) {
      url += '&Season=' + season;
      if (episode) { url += '&Episode=' + episode};
    };

    console.log("url:" + url)
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        if ((!episode && showTitle && !season) || (showTitle && !season && episode)) {
          setEpisodeTitle(json.Title)
          setGenres(json.Genre)
          setReleaseDate(json.Released)
          setRunTime(json.Runtime)
          setPlot(json.Plot)
          setRating(json.imdbRating)
          setImageURL(json.Poster)
        };
        if (!episode && json.totalSeasons) {
          setSeasonTotal(json.totalSeasons)
        }
      });

  }, [showTitle, season, episode]);

  

  
  return (
    <div>
      <Top 
        setter = {{setShowTitle, setSeason, setEpisode}} 
        seasonTotal = {seasonTotal}/>
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
