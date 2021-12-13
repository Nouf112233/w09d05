import React from 'react'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import './style.css'

function Header() {
 

    const state = useSelector((state) => {
        console.log("state.signIn.token", state.signIn.token);
        // console.log("state.tasks", state.tasks);
        return state;
      });
    return (
        <div className='header'>
            {state.signIn.token&&<Link className='nave1' to="/post">my post</Link>}
            <Link className='nave2' to="/">home</Link>
            
        </div>
    )
}

export default Header
