import { useState } from 'react'
import Player from './Player'
import PlayerAdder from './PlayerAdder'
import { Container } from 'react-bootstrap'
import cLog from '../functions/ConsoleLogger'

export default function PlayerHUD({ drill }) {
    const { players, setPlayers, isPlaying, setIsPlaying, currentUser, setCurrentUser, whoBuzzed, setWhoBuzzed, currentRound } = drill
        // cLog("USER DATA", "PlayerHUD", currentUser)
        // cLog("PLAYERS", "PlayerHUD.js", players)
    return (
        <div
            // className="d-flex flex-column py-2"
            // style={{height: "50vh" }}
            className="float-container" >              
            {players.map((player, i) => 
                    player.name===""
                    ?   currentRound===0
                        ?   <PlayerAdder drill={drill} number={i+1} />
                        :   null
                    :   <Player drill={drill} player={player} number={i+1} />
            )}
        </div>
    )
}
