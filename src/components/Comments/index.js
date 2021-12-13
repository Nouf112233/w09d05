import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  getPosts,
  addPost,
  deletePost,
  updatePost,
} from "./../../reducer/post";
import { logout } from "./../../reducer/login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function Comments() {
    const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector((state) => {
    console.log("state.signIn.token", state.signIn.token);
    // console.log("state.tasks", state.tasks);
    return state;
  });

    return (
        <div>
            
        </div>
    )
}

export default Comments
