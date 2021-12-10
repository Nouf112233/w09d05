import React, { useState } from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import {login} from "./../../reducer/login"
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';

function SignIn() {
    const dispatch=useDispatch();

    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();

    const signin=async()=>{
        let role="";
        console.log("name",name,"password",password)
        const user=await axios.post(`${process.env.REACT_APP_BASIC_URL}/login`, {name:name,password:password})
        console.log("user.data",user.data)
        if(user.data.result.role=="61a732fa694d3b6362ba9e99")
    
        {
             role="admin"
        }else{role="user";}
        const data={
            role:role,
            token:user.data.token

        }
        dispatch(login(data));
        navigate(`/posts`);
    }
    return (
        <div>
            <input placeholder="email/username" type="text" onChange={(e)=>setName(e.target.value)} required/><br/>
            <input placeholder="password" type="password" onChange={(e)=>setPassword(e.target.value)}required/><br/>
            <button onClick={signin}>signin</button>
            
        </div>
    )
}

export default SignIn