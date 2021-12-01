import { useState } from 'react'
import Player from './Player'
import PlayerAdder from './PlayerAdder'
import { Container } from 'react-bootstrap'
import cLog from '../functions/ConsoleLogger'

export default function PlayerHUD({ players, setPlayers, playing, setPlaying }) {
        const [ whoBuzzed, setWhoBuzzed ] = useState("")

    // console.log("PLAYERS @PlayerHUD.js: ", players)
    return (

        <div
            // className="d-flex flex-column py-2"
            className="float-container"
            // style={{height: "50vh" }}
            >
        
                
            {players.map((player, i) => 

                    player.name===""
                    ? <PlayerAdder 
                        className="float-child"
                        players={players} 
                        setPlayers={setPlayers}
                        number={i+1}
                        />
                    : <Player 
                        className="float-child"
                        player={player} 
                        players={players}
                        setPlayers={setPlayers}
                        number={i+1}
                        playing={playing}
                        setPlaying={setPlaying}
                        whoBuzzed={whoBuzzed}
                        setWhoBuzzed={setWhoBuzzed}
                        />
            )}
        </div>
    )
}
