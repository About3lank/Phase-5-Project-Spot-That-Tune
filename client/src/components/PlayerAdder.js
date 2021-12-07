import { useState, useEffect } from 'react'
import { Container, Form } from 'react-bootstrap'

import cLog from '../functions/ConsoleLogger'

export default function PlayerAdder({ drill, number }) {
    const { players, setPlayers, currentUser, setCurrentUser } = drill
        const [ playerName, setPlayerName ] = useState("")
        const [ buildUser, setBuildUser ] = useState(null)
        const [ showForm, setShowForm ] = useState(false)

    // function handleAddPlayer() {

    // }

    useEffect(() => {
        if (buildUser) {
            fetch(
                "/users", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(buildUser),
                })
            .then(res => res.json())
            .then(data => {
                const updatedPlayers = [...players]
                updatedPlayers[number - 1].id = data.id
                setPlayers(updatedPlayers)
            })
        }

    }, [buildUser])

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

        cLog("PLAYERS", "HANDLE SUBMIT NAME top", players)

        const updatedPlayers = [...players]
        updatedPlayers[number - 1].name = playerName
        setPlayers(updatedPlayers)

        const buildNewUser = {...currentUser}
        buildNewUser.display_name = playerName
        cLog("BUILD NEW USER", "handleSubmitName", buildNewUser)
        setCurrentUser(buildNewUser)

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
