import React from 'react'

export default function NavBar({ drill }) {
    const {currentUser, currentGame} = drill
    return (
        <div id="navbar">
            <div className="nav-item">Welcome, {currentUser.account_name}</div>
            {currentGame
            ? <div className="nav-item">Current Game: {currentGame.code}</div>
            : null }
        </div>
    )
}
