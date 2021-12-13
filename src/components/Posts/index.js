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
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../Header";

function Posts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postName, setPostName] = useState("");
  const [postadd, setPostadd] = useState("");
  const [allPost,setAllPost]=useState([]);

  const state = useSelector((state) => {
    console.log("state.signIn.token", state.signIn.token);
    // console.log("state.tasks", state.tasks);
    return state;
  });

  const getallposts = async () => {
    try {
      const allpost = await axios.get(
        `${process.env.REACT_APP_BASIC_URL}/getallpost`,
        // { headers: {Authorization: `Bearer ${state.signIn.token}` } }
      );
      console.log("allpost",  allpost.data);
      setAllPost( allpost.data)
    } catch (error) {
      console.log(error);
    }
  };

  const createPost = async () => {
    if (postadd) {
      const newPost = await axios.post(
        `${process.env.REACT_APP_BASIC_URL}/post`,
        { disc: postadd },
        { headers: { Authorization: `Bearer ${state.signIn.token}` } }
      );
      console.log("newPost",newPost.data);
       const data = {
         task: newPost.data,
        };
       dispatch(addPost(data));
       setPostadd("");
    }
  };



 

    const deletepost = async (_id, i) => {

       try {
          await axios.delete(`${process.env.REACT_APP_BASIC_URL}/post/${_id}`, {
            headers: {
              Authorization: `Bearer ${state.signIn.token}`,
            },
          });

           const data = {
              index: i,
            };
           dispatch(deletePost(data));
        } catch (error) {
          console.log(error);
        }
    };

    const updatepost = async(_id, i) => {
      if (postName.length > 0) {
       const newpost=await axios.put(
         `${process.env.REACT_APP_BASIC_URL}/post`,
         {_id: _id, disc: postName },
         { headers: { Authorization: `Bearer ${state.signIn.token}` } }
       );
       const data = {
        newPost:newpost.data,
         indx:i
       };
       dispatch(updatePost(data));
      }

      setPostName("");

    };

    const goComment=(_id)=>{
      navigate(`/comments/${_id}`);
    }
    const gomaypost=()=>{
        navigate(`/post`);
    }

  const out = () => {
    dispatch(logout({ role: "", token: "" }));
    // dispatch(add({name:[]}));
    navigate(`/account`);
  };

  useEffect(() => {
    getallposts();
  }, []);

  return (
    <div>
        <Header />
        
      <input
        type="text"
        value={postadd}
        onChange={(e) => {
          setPostadd(e.target.value);
        }}
      />
      <button  onClick={createPost}>add post</button>
   

      {allPost&&allPost.length &&
        allPost.map((item, i) => {
          // console.log("item", item);
          return (
            <div key={item._id}  onClick={()=>goComment(item._id)}>
              <h1>{item.disc}</h1>
              {(state.signIn.userId===item.user||state.signIn.role==="admin")&&<button onClick={() => deletepost(item._id, i)}>delete</button>}
              <input
                type="text"
                //   value={taskName}
                onChange={(e) => {
                  setPostName(e.target.value);
                }}
              />
              {state.signIn.userId===item.user&&<button onClick={() => updatepost(item._id, i)} >update</button>}
             
            </div>
          );
        })}
      <button onClick={out}>LogOut</button>
    </div>
  );
}

export default Posts;

// "name":"noufi",
// "password":"Ac156&7"