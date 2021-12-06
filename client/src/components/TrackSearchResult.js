import React from 'react'

export default function TrackSearchResult({ track, playTrack }) {
    function handlePlay() {
        console.log("TRACK @tracksearchresult _onClick_: ", track)
        playTrack(track)
    }
    return (
        <div
            className="d-flex m-2 align-items-center"
            style={{ cursor: "pointer" }}
            onClick={handlePlay}
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
