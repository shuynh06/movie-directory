import React from 'react';

function episodeInformation (props) {
    return (
        <div className='information-box'>
            <div className='not-image'>
                <div id="title"> Title: {props.title} </div>
                <div id="plot">Description: {props.plot} </div>
                <div id="genres"> Genres: {props.genres} </div>
                <div id="rating"> Rating: {props.rating}/10 </div>
            </div>
            <div className='with-image'>
                <img id='image' src={props.poster} alt="episode"></img>
            </div>
        </div>

        //<div>
        //    <div id="title"> {props.title} </div>
        //    <div id="rating"> {props.rating}</div>
        //    <div id="plot"> {props.plot}</div>
        //    <div id="genres"> {props.genres}</div>
        //    <div id="releaseDate"> {props.releaseDate}</div>
        //    <div id="runTime"> {props.runTime}</div>
        //</div>
    )
}

export default episodeInformation 