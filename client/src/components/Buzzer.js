import React from 'react'

export default function Buzzer({ players, setPlayers, number, playing, setPlaying, whoBuzzed, setWhoBuzzed }) {
    function amIStillIn() {
        return !players[number-1].eliminated
    }

    function handleBuzz() {
        console.log("clicked BUZZ")
        console.log("playing??: ", playing)
        if (playing) {
            console.log("doing BUZZ stuff...")

            setPlaying(false)
            setWhoBuzzed(number)

            const updatedPlayers = [...players]
            updatedPlayers[number-1].eliminated = true
            setPlayers(updatedPlayers)

        }

    }

    return (
        <button 
            type="button" 
            onClick={handleBuzz} 
            style={{borderRadius: "50px"}}
            >
                {(playing && amIStillIn())? "BUZZZZ" : "..."}
        </button>
    )
}
