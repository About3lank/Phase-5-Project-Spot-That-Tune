import React from 'react'

export default function NavBar({ drill }) {
    const {currentUser, currentGame} = drill
    return (
        <div id="navbar">
            <div>Welcome, {currentUser.account_name}</div>
            {currentGame
            ? <div>Current Game: {currentGame.code}</div>
            : null }
        </div>
    )
}
