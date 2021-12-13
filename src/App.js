import React, {useEffect} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Account from "./components/Account";
import Post from "./components/Post";
// import AdminTask from "./components/AdminTask";
import { useSelector } from "react-redux";
import Register from "./components/Rejaster";
import SignIn from "./components/SignIn";
import Posts from "./components/Posts";
import Comments from "./components/Comments";
import Forgit from "./components/Forgit";


function App() {
  const state = useSelector((state) => {
    console.log("state", state);
    return state;
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!state.signIn.token) {
      navigate("/account");
    }
    // } else {
    //   if (state.signIn.role === "user") navigate("/");
    // }
  }, []);

  return (
    <>
     

      <Routes>
        <Route exact path="/account" element={<Account />} />
        <Route exact path="/post" element={<Post />} />
        <Route exact path="/" element={<Posts />} />

        <Route exact path="/register" element={<Register />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/comments/:id" element={<Comments />} />
        <Route exact path="/forgit" element={<Forgit />} />
      </Routes>
    </>
  );
}

export default App;
