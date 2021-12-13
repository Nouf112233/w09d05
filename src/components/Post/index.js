import React, { useEffect, useState } from "react";
import axios from "axios";
import { storage } from "./../../firebase";

import {
  getPosts,
  addPost,
  deletePost,
  updatePost,
} from "./../../reducer/post";
import { logout } from "./../../reducer/login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header";

function Post() {
  const [file, setFile] = useState(null);
  // const [url, setURL] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postName, setPostName] = useState("");
  const [postadd, setPostadd] = useState("");

  const state = useSelector((state) => {
    console.log("state.signIn.token", state.signIn.token);
    // console.log("state.tasks", state.tasks);
    return state;
  });

  const handleUpload = () => {
    const ref = storage.ref(`/images/${file.name}`);
    const uploadTask = ref.put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      ref.getDownloadURL().then((url) => {
        setFile(null);
        // setURL(url);
        createPost(url);
      });
    });
  };

  const getuserpost = async () => {
    try {
      const userPosts = await axios.get(
        `${process.env.REACT_APP_BASIC_URL}/getpost`,
        { headers: {Authorization: `Bearer ${state.signIn.token}` } }
      );
      console.log("userPosts", userPosts);
       const data = {
            name: userPosts.data,
          };
          dispatch(getPosts(data));
    } catch (error) {
      console.log(error);
    }
  };

  const createPost = async (url) => {
    console.log("url createPost", url);
    if (postadd) {
      const newPost = await axios.post(
        `${process.env.REACT_APP_BASIC_URL}/post`,
        { disc: postadd,image: url},
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

  const out = () => {
    dispatch(logout({ role: "", token: "" }));
    // dispatch(add({name:[]}));
    navigate(`/account`);
  };

  useEffect(() => {
    getuserpost();
  }, []);

  return (
    <div>
      <Header />
      <input
        type="file"
        name="avatar"
        accept="image/*"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <input
        type="post"
        name="post"
        placeholder="post"
        onChange={(e) => setPostadd(e.target.value)}
      />
      <button onClick={() => handleUpload()}> add post </button>
   

      {state.posts.name&&state.posts.name.length &&
        state.posts.name.map((item, i) => {
          // console.log("item", item);
          return (
            <div key={item._id}  onClick={()=>goComment(item._id)}>
              <img src={item.image} alt="post imag" width="500" height="600"></img>
              <h1>{item.disc}</h1>
              <p>{item.time}</p>
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

export default Post;

// "name":"noufi",
// "password":"Ac156&7"
