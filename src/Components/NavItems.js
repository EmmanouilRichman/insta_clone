import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import {Link} from 'react-router-dom';

export default function NavItems() {
    const{isAuthenticated} = useAuth0();
    return (
       isAuthenticated && (
             <React.Fragment>
                <li className="navbar-item">
                    <Link to= "/" className="nav-link">Posts</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/create" className="nav-link">Create Post</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/profile" className="nav-link">Profile</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/chat" className="nav-link">Chat</Link>
                </li>
            </React.Fragment>
       )
    )
}
