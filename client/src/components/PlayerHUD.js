import { useState } from 'react'
import Player from './Player'
import PlayerAdder from './PlayerAdder'
import { Container } from 'react-bootstrap'
import cLog from '../functions/ConsoleLogger'

export default function PlayerHUD({ players, setPlayers, playing, setPlaying }) {
        const [ whoBuzzed, setWhoBuzzed ] = useState("")

    // console.log("PLAYERS @PlayerHUD.js: ", players)
    return (

        <Container 
            className="d-flex flex-column py-2"
            style={{height: "50vh" }}
            >
        
                
            {players.map((player, i) => 

                    player.name===""
                    ? <PlayerAdder 
                        players={players} 
                        setPlayers={setPlayers}
                        number={i+1}
                        />
                    : <Player 
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
        </Container>
    )
}
