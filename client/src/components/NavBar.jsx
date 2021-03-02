import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavBar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar">
                    <Link to="/slopes">Slopes</Link>
                    <Link to="/hiddenPaths">Hidden Paths</Link>
                    <Link to="/buildings">Buildings</Link>
                </nav>
            </div>
        )
    }
}
