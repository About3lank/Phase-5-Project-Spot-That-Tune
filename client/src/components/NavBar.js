import React from 'react'

export default function NavBar({ userData, currentGame }) {
    return (
        <div id="navbar">
            <div>Welcome, {userData.display_name}</div>
            {currentGame
            ? <div>Current Game: {currentGame.code}</div>
            : null }
        </div>
    )
}
