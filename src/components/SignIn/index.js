import React, { useState } from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import {login} from "./../../reducer/login"
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';
// import { GoogleLogin } from "react-google-login";

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
             role="admin";
        }else{role="user";}
        const data={
            role:role,
            token:user.data.token,
            userId:user.data.result._id

        }
        dispatch(login(data));
        navigate(`/`);
    }

    // const responseSGoogle = async (responce) => {
    //     const result = await axios.post(
    //       `${process.env.REACT_APP_BASE_URL}/googlelogin`,
    //       { idToken: responce.tokenId }
    //     );
    
    //     const data = {
    //       role: result.data.user.role,
    //       token: result.data.token,
         
    //     };
    //     dispatch(login(data));
    //     navigate(`/home`);
    
    
    //   };
    //   const responseFGoogle = (res) => {
    //     console.log(res);
    //   };

    const forgit=()=>{
        navigate(`/forgit`);
    }
    return (
        <div className='contain'>
            <input placeholder="email/username" type="text" onChange={(e)=>setName(e.target.value)} required/><br/>
            <input placeholder="password" type="password" onChange={(e)=>setPassword(e.target.value)}required/><br/>
            <button onClick={signin}>signin</button>
            <p onClick={forgit}>forgit password</p>
            {/* <GoogleLogin
          clientId="1012491114950-5htc73u0e5d1f7shkqq8c852ponfa6jn.apps.googleusercontent.com" //dotenv -----
          buttonText="Sign in with google"
          onSuccess={responseSGoogle}
          onFailure={responseFGoogle}
          cookiePolicy={"single_host_origin"}
        /> */}
            
        </div>
    )
}

export default SignIn