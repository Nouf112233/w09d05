import React from 'react'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
 

    const state = useSelector((state) => {
        console.log("state.signIn.token", state.signIn.token);
        // console.log("state.tasks", state.tasks);
        return state;
      });
    return (
        <div>
            {state.signIn.token&&<Link to="/post">my post</Link>}
            <Link to="/">home</Link>
            
        </div>
    )
}

export default Header
