import React from 'react'
import { Container, Form } from 'react-bootstrap'
import TrackSearchResult from './TrackSearchResult'

export default function GuessSong({ drill }) {
    const {players, trackSearch, setTrackSearch, trackResults, playTrack, whoBuzzed } = drill
    return (
        <>
            <h1>{players[whoBuzzed.num-1].name} buzzed in!</h1>
            <Form.Control 
                className="form-control search-box"
                type="search" 
                placeholder="Search Spotify for that tune..."
                value={trackSearch}
                onChange={e => setTrackSearch(e.target.value)}
                />
            <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
                {trackResults.map(track => (
                    <TrackSearchResult
                        drill={drill}
                        track={track}
                        key={track.url} 
                        playTrack={playTrack}
                        />
                ))}
                {/* {trackResults.length === 0 && (
                    <div className="text-center" style={{ whiteSpace: "pre" }}>{lyrics}</div>
                )} */}
            </div>
        </>
    )
}
