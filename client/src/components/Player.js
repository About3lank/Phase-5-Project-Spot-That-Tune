import { useEffect } from 'react'
import Buzzer from './Buzzer'

export default function Player({ drill, player, number }) {
    const { players, setPlayers, isPlaying, setIsPlaying, whoBuzzed, setWhoBuzzed } = drill

    return (
        <div className="float-child">
            <h3>{player.name}</h3>
            <p><em>Player #{number}</em></p>
            <Buzzer drill={drill}
                // players={players}
                // setPlayers={setPlayers}
                // number={number}
                // isPlaying={isPlaying}
                // setIsPlaying={setIsPlaying}
                // whoBuzzed={whoBuzzed}
                // setWhoBuzzed={setWhoBuzzed} 
                />
            <div>[[[TOKENS GO HERE]]]</div>
        </div>
    )
}
