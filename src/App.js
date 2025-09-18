import './App.css';
import Top from './webParts/Top.js';
import EpisodeInformation from './webParts/episodeInformation.js';
import React, { useState, useEffect } from 'react';


function App() {
  const [showTitle, setShowTitle] = useState('');
  const [season, setSeason] = useState('');
  const [seasonTotal, setSeasonTotal] = useState('');
  const [seasonInformation, setSeasonInformation] = useState('');
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

    let APIKey = process.env.REACT_APP_OMDB_KEY;
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

        if ((!episode && showTitle && !season) || (showTitle && season && episode)) {
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

        if (!episode && season) {
          setSeasonInformation(json.Episodes)
        }
      });

  }, [showTitle, season, episode]);

  

  
  return (
    <div>
      <Top 
        setter = {{setShowTitle, setSeason, setEpisode}} 
        seasonTotal = {seasonTotal}
        seasonInformation = {seasonInformation}
        season = {season}
      />
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
