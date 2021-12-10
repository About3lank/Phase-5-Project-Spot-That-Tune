import React from 'react'
import Button from './Button'
import { CloseButton } from 'react-bootstrap'

export default function ChosenPlaylist({drill}) {
    const {currentPlaylist, setCurrentPlaylist, setShowPlaylistSearch, setPlaylistTracks} = drill
    if (!currentPlaylist) return (<></>)
    function handleReturn() {
        setCurrentPlaylist(null)
        setPlaylistTracks([])
        setShowPlaylistSearch(true)
    }
    return (
        <div>
            <img 
                src={currentPlaylist.image_url}
                style={{height:"20vh", width: "auto", margin: "3em auto 2em"}} />
            <h2><span style={{color: "rgb(144,144,144)"}}>Playlist: </span><span style={{fontWeight: "bold"}}>{currentPlaylist.name}</span></h2>
            <button onClick={handleReturn} className="return-btn">
                    {"< Back to Playlist Selection"}
            </button>
        </div>
    )
}
