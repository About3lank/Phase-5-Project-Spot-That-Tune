import React from 'react'

export default function PlaylistSearchResult({ playlist, choosePlaylist }) {
    function handleChoice() {
        choosePlaylist(playlist)
    }
    return (
        <div
            className="d-flex m-2 align-items-center"
            style={{ cursor: "pointer" }}
            onClick={handleChoice}
            >
            <img
                src={playlist.image_url} 
                style={{ height: "64px", width: "64px" }}
                />
            <div className="ml-3">{playlist.name}</div>
            <div className="text-muted">&nbsp;{playlist.description.length>0? `- ${playlist.description}` : "" }</div>
            
        </div>
    )
}
