import React from "react";
import { Routes, Route} from "react-router-dom";
import Account from "./components/Account";
import Post from "./components/Post";
// import AdminTask from "./components/AdminTask";
import { useSelector } from "react-redux";
import Register from "./components/Rejaster";
import SignIn from "./components/SignIn";
import Posts from "./reducer/post";
import Comments from "./components/Comments";



function App() {

  const state = useSelector((state) => {
    console.log("state", state);
    return state;
  });

 
  return (
    <>
    {!state.signIn.token && <Account />}
    {(state.signIn.token && state.signIn.role==="user") && <Post /> }
    {/* {(state.signIn.token && state.signIn.role==="admin") && <AdminTask /> }  */}
   
    <Routes>
        <Route exact path="/posts" element={<Posts />} />
        <Route exact path="/account" element={<Account />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/comments/:id" element={<Comments />} />
      </Routes>
    </>
   
  );
}

export default App;