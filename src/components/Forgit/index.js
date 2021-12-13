
import React, { useEffect, useState } from "react";
import axios from "axios";

function Forgit() {
    const [email,setEmail]=useState("");
    const [rand,setrand]=useState("");
    const [pass,setpass]=useState("");
    const [target,setTarger]=useState(false);


    const forgit = () => {
        axios.post(`${process.env.REACT_APP_BASIC_URL}/forgit'`, {
          email: email,
       
        });
        setTarger(true);
      };

      const change=()=>{
        axios.post(`${process.env.REACT_APP_BASIC_URL}/changpass'`, {
            email: email,
           rand:rand,
           password:pass
         
          });
      }
    return (
        
        <div className='contain'>
         { !target&&  <>
            <input
        placeholder="enter your email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button onClick={forgit} className="forgit">sent code to your email</button>
      </> } 
      {target&&<> 
       
            <input
        placeholder="enter your email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
       <input
        placeholder="enter code"
        type="number"
        onChange={(e) => setrand(e.target.value)}
        required
      />
      <p>password must to contain at least 1 capital litter , small litter, symbole, and at least 6 characters</p>
       <input
        placeholder="enter new password"
        type="password"
        onChange={(e) => setpass(e.target.value)}
        required
      />
      <button onClick={change}>change password</button>
      </>    }
        </div>
       
    )
}

export default Forgit
