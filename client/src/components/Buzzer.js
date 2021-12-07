import React from 'react'

export default function Buzzer({ drill, number }) {
    const { players, setPlayers, isPlaying, setIsPlaying, whoBuzzed, setWhoBuzzed, showTrackSearch, setShowTrackSearch } = drill
    function amIStillIn() {
        return !players[number-1].eliminated
    }

    function handleBuzz() {
        console.log("clicked BUZZ")
        console.log("isPlaying??: ", isPlaying)
        if (isPlaying) {
                // console.log("doing BUZZ stuff...")
            setIsPlaying(false)
            setWhoBuzzed(number)
            const updatedPlayers = [...players]
                updatedPlayers[number-1].eliminated = true
                setPlayers(updatedPlayers)
            setShowTrackSearch(true)
        }
    }

    return (
        <button 
            type="button" 
            onClick={handleBuzz} 
            style={{borderRadius: "50px"}}
            >
                {(isPlaying && amIStillIn())? "BUZZZZ" : "..."}
        </button>
    )
}
