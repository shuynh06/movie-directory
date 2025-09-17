import React, { useState, useEffect } from 'react';

function EpisodeSearch (props) {
    const [query, setQuery] = useState('')

    const handleSubmission = (e) => {
        e.preventDefault();
        props.onSearch(query);
        
    }

    const updateEpisodes = () => {
        const seasonSelect = document.getElementById("season-select");
        props.setSeason(seasonSelect.value);
        console.log('changed', seasonSelect.value);
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
                <select className="season-select" name="drop-one" id="season-select"  value={props.season || 1} onChange={updateEpisodes}> </select>
            </div>

            <div className = "episode-drop-down">
                <label for="drop-two">Episode: </label>
                <select className="episode-select" name="drop-two" id="episode-select"></select>

            </div>
        </div>
    )
}

export default EpisodeSearch