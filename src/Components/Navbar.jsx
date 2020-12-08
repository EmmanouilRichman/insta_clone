import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {Login} from './Login';
import Logout from './Logout.js'
import Navitems from './NavItems';

export default class NavBar extends Component {
    render() {
        return (
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                    <Link to="/" className="navbar-brand">MannyGram</Link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    		            <span class="navbar-toggler-icon"></span>
  	                </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Login />
                            </li>
                            <li className="nav-item">
                                <Logout className="nav-link"/>
                            </li>
                           <Navitems />
                        </ul>
                    </div>
                </nav>
        )
    }
}
