import React from 'react'
import {  Link } from "react-router-dom";


function Account() {
    return (
        <div>
            <Link to="/register">Register</Link>
            <Link to="/signin">SignIn</Link>
        </div>
    )
}

export default Account;