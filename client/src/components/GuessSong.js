import React from 'react'
import { Container, Form } from 'react-bootstrap'
import TrackSearchResult from './TrackSearchResult'

export default function GuessSong({ drill }) {
    const {trackSearch, setTrackSearch, trackResults, playTrack } = drill
    return (
        <>
            <Form.Control 
                className="form-control search-box"
                type="search" 
                placeholder="Search Songs"
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
