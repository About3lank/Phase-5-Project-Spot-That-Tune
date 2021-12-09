import React from 'react'
import cLog from '../functions/ConsoleLogger'

export default function Buzzer({ drill, number }) {
    const { players, setPlayers, isPlaying, setIsPlaying, whoBuzzed, setWhoBuzzed, showTrackSearch, setShowTrackSearch, currentSong} = drill
    function amIStillIn() {
        return !players[number-1].eliminated
    }

    function handleBuzz() {
        if (players[number - 1].eliminated) { return }
        if (!isPlaying) { return }
        playBuzzAudio()
        cLog("CURRENT SONG", "handleBuzz", currentSong)
        setIsPlaying(false)
        const updatedPlayers = [...players]
            updatedPlayers[number-1].eliminated = true
            setPlayers(updatedPlayers)
            setWhoBuzzed(players[number-1].id)
        setShowTrackSearch(true)
        // cLog(                                   "PLAYERS", "Buzzer@handleBuzz", players)
        // cLog(                                   "WHO BUZZED???? (ID)", "Buzzer@handleBuzz", whoBuzzed)
        
    }

    function playBuzzAudio() {
        // const buzzerUrl = "http://soundbible.com/grab.php?id=1501&type=mp3"
        // const buzzerUrl = "http://soundbible.com/grab.php?id=1495&type=mp3"
        // const buzzerUrl = "https://notification-sounds.com/soundsfiles/Game-show-buzzer-sound.mp3"
        
        const buzzerUrl = "https://notification-sounds.com/soundsfiles/Good-idea-bell.mp3"
        let audio = new Audio(buzzerUrl);
        audio.play();
    }

    const color = () => amIStillIn()? "#1ed760" : "rgb(255, 233, 167)"

    return (
        <button
            type="button" 
            className = "buzzer"
            onClick={handleBuzz} 
            style={( amIStillIn())
                    ?   {
                            width: "100%", 
                            borderRadius: "50px", 
                            backgroundColor: "#1ed760",
                            margin: "1vh 0"
                        }
                    :   {
                        width: "100%", 
                        borderRadius: "50px", 
                        backgroundColor: "rgb(255, 233, 167)",
                        margin: "1vh 0"
                    }
            }
            >
                {(isPlaying && amIStillIn())? "BUZZZZ" : "..."}
        </button>
    )
}
