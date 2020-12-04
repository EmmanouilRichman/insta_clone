import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {useAuth0} from '@auth0/auth0-react'

export default function Profile() {
const {user} = useAuth0();
    return (
        <div  className="container" style={{textAlign: 'center'}}>
            <h1 >{user.name}</h1>
            <img style={{width: '300px', height: '300px'}} src={user.picture} alt="profile" />
            <p><i>{user.email}</i></p>
        </div>
    )
}
