import { useEffect } from 'react'
import Buzzer from './Buzzer'

export default function Player({ player, players, setPlayers, playing, setPlaying, number, whoBuzzed, setWhoBuzzed }) {
    return (
        <div className="float-child">
            <h3>{player.name}</h3>
            <p><em>Player #{number}</em></p>
            <Buzzer
                players={players}
                setPlayers={setPlayers}
                number={number}
                playing={playing}
                setPlaying={setPlaying}
                whoBuzzed={whoBuzzed}
                setWhoBuzzed={setWhoBuzzed} 
                />
            <div>[[[TOKENS GO HERE]]]</div>
        </div>
    )
}
