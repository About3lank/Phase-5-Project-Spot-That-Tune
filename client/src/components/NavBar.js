import React from 'react'

export default function NavBar({ userData }) {
    return (
        <div id="navbar">
            <div>Welcome, {userData.display_name}</div>
        </div>
    )
}
