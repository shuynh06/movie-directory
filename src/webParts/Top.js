import React from 'react';
import EpisodeSearch from './episodeSearch';


function Top ( {setter, seasonTotal, season, seasonInformation} ) {
    const handleSearch = (searchQuery) => {
        console.log(searchQuery)
        setter.setShowTitle(searchQuery);
        console.log("test:" + seasonTotal)
    };

    return (
        <div className="top-header">
            <div className="top-information">
                <font className="top-information-text">Movie Directory</font>
            </div>
            <EpisodeSearch 
            onSearch={handleSearch} 
            season = {season}
            seasonTotal = {seasonTotal} 
            seasonInformation = {seasonInformation}
            setSeason = {setter.setSeason} 
            setEpisode = {setter.setEpisode}
            />
        </div>


    )
}

export default Top;