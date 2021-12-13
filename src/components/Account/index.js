import React from 'react'
import {  Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import {login} from "./../../reducer/login"
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';
import {useNavigate,useParams} from 'react-router-dom'
import './style.css'



function Account() {
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const responseSGoogle = async (responce) => {
        const result = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/googlelogin`,
          { idToken: responce.tokenId }
        );
    
        const data = {
          role: result.data.user.role,
          token: result.data.token,
         
        };
        dispatch(login(data));
        navigate(`/`);
    
    
      };
      const responseFGoogle = (res) => {
        console.log(res);
      };
    return (
        <div className='contain' >
            <Link to="/register" className='xx'>Register</Link>
            <Link to="/signin" className='xx'>SignIn</Link>
            <GoogleLogin
          clientId="1012491114950-5htc73u0e5d1f7shkqq8c852ponfa6jn.apps.googleusercontent.com" //dotenv -----
          buttonText="Sign in with google"
          onSuccess={responseSGoogle}
          onFailure={responseFGoogle}
          cookiePolicy={"single_host_origin"}
        />
        </div>
    )
}

export default Account;