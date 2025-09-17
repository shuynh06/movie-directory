import React, { useState, useEffect } from 'react';

function EpisodeSearch (props) {
    const [query, setQuery] = useState('')

    // TODO: when searching for a new show (when a show is already searched) reset the the season and episode selects
    // TODO: remake handleSubmission to more like updateEpisodes and updateInformation  (if possible)
    // TODO: after above are done, check for bugs
    // TODO: figure out how to hide API key
    // TODO: figure out how to deploy
    // TODO: if this doesnt work in the morning then make sure to put API key back

    const handleSubmission = (e) => {
        e.preventDefault();
        props.onSearch(query);
        
    }

    const updateEpisodes = () => {
        const seasonSelect = document.getElementById("season-select");
        props.setSeason(seasonSelect.value);
    }

    const updateInformation = () => {
        const episodeSelect = document.getElementById("episode-select");
        props.setEpisode(episodeSelect.value);
    }

    useEffect(() => {
        const seasonSelect = document.getElementById("season-select")
        const episodeSelect = document.getElementById("episode-select")

        if (props.seasonTotal && seasonSelect.options.length === 0) {
            seasonSelect.innerHTML = "";

            const placeholder = document.createElement("option");
            placeholder.value = "";
            placeholder.textContent = "";
            placeholder.selected = true;
            placeholder.hidden = true;
            seasonSelect.appendChild(placeholder)

            for (let i=0; i<parseInt(props.seasonTotal); i++) {
                const option = document.createElement('option');

                option.textContent = i+1;
                option.value = i+1;

                seasonSelect.appendChild(option);
            }
        }

        if (props.season) {
            episodeSelect.innerHTML = "";

            const placeholder = document.createElement("option");
            placeholder.value = "";
            placeholder.textContent = "";
            placeholder.hidden = true;
            placeholder.selected = true;
            episodeSelect.appendChild(placeholder)

            for (let i=0; i<props.seasonInformation.length; i++) {
                const option = document.createElement('option');

                option.textContent = i+1 + ": " + props.seasonInformation[i].Title;
                option.value = i+1;

                episodeSelect.appendChild(option);
            }
        }
    }, [props.seasonTotal, props.season, props.seasonInformation]);

    return (
        <div className="search-box">
            <form className="row" onSubmit={handleSubmission}>
                <input type="text" id="input-box" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)}/>
                <button>Search</button>
            </form>
            
            <div className = "season-drop-down">
                <label for="drop-one">Seasons: </label>
                <select className="season-select" name="drop-one" id="season-select" onChange={updateEpisodes}> </select>
            </div>

            <div className = "episode-drop-down">
                <label for="drop-two">Episode: </label>
                <select className="episode-select" name="drop-two" id="episode-select" onChange={updateInformation}></select>

            </div>
        </div>
    )
}

export default EpisodeSearch