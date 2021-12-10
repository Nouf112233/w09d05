import React from 'react'
import Post from '../Post';
import {  useSelector } from "react-redux";


function Posts() {
    const state = useSelector((state) => {
        // console.log("state.signIn.token", state.signIn.token);
        // console.log("state.tasks", state.tasks);
        return state;
      });
    return (
        <>
            {(state.signIn.token && state.signIn.role==="user") && <Post /> }
        </>
    )
}

export default Posts;