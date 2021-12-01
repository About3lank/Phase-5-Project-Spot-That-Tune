import { useState } from 'react'
import { Container, Form } from 'react-bootstrap'

export default function PlayerAdder({ players, setPlayers, number }) {
        const [ playerName, setPlayerName ] = useState("")
        const [ showForm, setShowForm ] = useState(false)

    // function handleAddPlayer() {

    // }

    if (number > 1) {
        if (players[number - 2].name==="") {
            return (<div></div>)
        }
    }

    function handleShowForm() {
        setShowForm(!showForm)
    }

    function handleFormChange(e) {
        // const currentName = document.getElementById(`player-name-form-${number}`)
        setPlayerName(e.target.value)
    }

    function handleSubmitName(e) {
        e.preventDefault()
        const updatedPlayers = [...players]
        updatedPlayers[number - 1].name = playerName
        setPlayers(updatedPlayers)
    }

    return (
        <div className="float-child">
            {showForm
            ? <div>
                <Form.Control 
                    type="text" 
                    placeholder="Enter your name here"
                    value={playerName}
                    onChange={e => handleFormChange(e)}
                    />
                <Form.Control style={{width: "10vh" }}
                    type="button"
                    value="Ready?"
                    onClick={handleSubmitName}
                />
            </div>
            : <button
                type="button"
                onClick={handleShowForm}
                >
                    + ADD PLAYER #{number}
            </button>}
        </div>
    )
}
