import React from 'react'
import cLog from '../functions/ConsoleLogger'

export default function Buzzer({ drill, number }) {
    const { players, setPlayers, isPlaying, setIsPlaying, whoBuzzed, setWhoBuzzed, showTrackSearch, setShowTrackSearch } = drill
    function amIStillIn() {
        return !players[number-1].eliminated
    }

    function handleBuzz() {
        if (players[number - 1].eliminated) { return }
        if (!isPlaying) { return }
        // playBuzzAudio()
        setIsPlaying(false)
        const updatedPlayers = [...players]
            updatedPlayers[number-1].eliminated = true
            setPlayers(updatedPlayers)
            setWhoBuzzed(players[number-1].id)
        setShowTrackSearch(true)
        cLog(                                   "PLAYERS", "Buzzer@handleBuzz", players)
        cLog(                                   "WHO BUZZED???? (ID)", "Buzzer@handleBuzz", whoBuzzed)
        
    }

    // function playBuzzAudio() {
    //     let audio = new Audio(
    //         './Basketball-Buzzer.mp3'
    //         );
    //     audio.play();

    //     console.log("bzzz")
    // }

    return (
        <button
            type="button" 
            className = "buzzer"
            onClick={handleBuzz} 
            style={{borderRadius: "50px", backgroundColor: "yellow"}}
            >
                {(isPlaying && amIStillIn())? "BUZZZZ" : "..."}
        </button>
    )
}
