import React, { useState, useEffect } from 'react';

function EpisodeSearch (props) {
    const [query, setQuery] = useState('')

    const handleSubmission = (e) => {
        e.preventDefault();
        props.onSearch(query);
        
    }

    const updateEpisodes = () => {
        const selectName = document.getElementById("season-select");
        props.setSeason(selectName.value);
        console.log('changed', selectName.value);
    }

    useEffect(() => {
        const selectName = document.getElementById("season-select")
        if (props.seasonTotal) {
            selectName.innerHTML = "";
            for (let i=0; i<parseInt(props.seasonTotal); i++) {
                const option = document.createElement('option');

                option.textContent = i+1;
                option.value = i+1;

                selectName.appendChild(option);
            }
        }
    }, [props.seasonTotal]);

    return (
        <div className="search-box">
            <form className="row" onSubmit={handleSubmission}>
                <input type="text" id="input-box" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)}/>
                <button>Search</button>
            </form>
            
            <div className = "season-drop-down">
                <label for="drop-one">Seasons: </label>
                <select className="season-select" name="drop-one" id="season-select" onChange={updateEpisodes}>
                </select>
            </div>
        </div>
    )
}

export default EpisodeSearch