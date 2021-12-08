import React from 'react'
import cLog from '../functions/ConsoleLogger'

export default function TrackSearchResult({ drill, track }) {

    const { songGuess, setSongGuess } = drill
    // console.log("TRACK @tracksearchresult _onClick_: ", track)

    function handleGuess() {
        cLog("TRACK", "HANDLE GUESS", track)
        setSongGuess(track)
        cLog("SONG GUESS", "TRACK SEARCH RESULT, after handleGuess", songGuess)
    }
    
    return (
        <div
            className="d-flex m-2 align-items-center"
            style={{ cursor: "pointer" }}
            onClick={handleGuess}
        >
            <img
                src={track.image_url} 
                style={{ height: "64px", width: "64px" }}
            />
            <div className="ml-3">{track.title}</div>
            <div className="text-muted">&nbsp;- {track.artist}</div>
            
        </div>
    )
}
