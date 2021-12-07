import { useState } from 'react'
import Player from './Player'
import PlayerAdder from './PlayerAdder'
import { Container } from 'react-bootstrap'
import cLog from '../functions/ConsoleLogger'

export default function PlayerHUD({ drill }) {
    const { players, setPlayers, isPlaying, setIsPlaying, currentUser, setCurrentUser, whoBuzzed, setWhoBuzzed } = drill


        cLog("USER DATA", "PlayerHUD", currentUser)

    // console.log("PLAYERS @PlayerHUD.js: ", players)
    return (

        <div
            // className="d-flex flex-column py-2"
            className="float-container"
            // style={{height: "50vh" }}
            >
        
                
            {players.map((player, i) => 

                    player.name===""
                    ? <PlayerAdder drill={drill} number={i+1}
                        // className="float-child"
                        // players={players} 
                        // setPlayers={setPlayers}
                        // number={i+1}
                        // currentUser={currentUser}
                        // setCurrentUser={setCurrentUser}
                        />
                    : <Player drill={drill} player={player} number={i+1}
                        // className="float-child"
                        // 
                        // players={players}
                        // setPlayers={setPlayers}
                        // number={i+1}
                        // isPlaying={isPlaying}
                        // setIsPlaying={setIsPlaying}
                        // whoBuzzed={whoBuzzed}
                        // setWhoBuzzed={setWhoBuzzed}
                        />
            )}
        </div>
    )
}
