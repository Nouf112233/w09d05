import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../../reducer/login";
import './style.css'

function Header() {
 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector((state) => {
        console.log("state.signIn.token", state.signIn.token);
        // console.log("state.tasks", state.tasks);
        return state;
      });

      const out = () => {
        dispatch(logout({ role: "", token: "" }));
        // dispatch(add({name:[]}));
        navigate(`/account`);
      };
    return (
        <div className='header'>
            {state.signIn.token&&<Link className='nave1' to="/post">my post</Link>}
            <Link className='nave2' to="/">home</Link>
            <button onClick={out}>LogOut</button>
        </div>
    )
}

export default Header
