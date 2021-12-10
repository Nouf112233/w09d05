import React, { useEffect, useState } from "react";
import axios from "axios";
// import {
//   getPosts,
//   addPost,
//   deletePost,
//   updatePost,
// } from "./../../reducer/post";
import { logout } from "./../../reducer/login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function Post() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postName, setPostName] = useState("");
  const [postadd, setPostadd] = useState("");

  const state = useSelector((state) => {
    console.log("state.signIn.token", state.signIn.token);
    // console.log("state.tasks", state.tasks);
    return state;
  });

  const getuserpost = async () => {
    try {
      const userPosts = await axios.get(
        `${process.env.REACT_APP_BASIC_URL}/getpost`,
        { headers: { Autorization: `Bearer ${state.signIn.token}` } }
      );
      console.log("userPosts", userPosts);
    } catch (error) {
      console.log(error);
    }
  };

  const createPost = async () => {
    if (postadd.length > 0) {
      const newPost = await axios.post(
        `${process.env.REACT_APP_BASIC_URL}/post`,
        { disc: postadd },
        { headers: { Autorization: `Bearer ${state.signIn.token}` } }
      );
      console.log("newPost",newPost);
    }
  };

  //   const getposts = async () => {
  //     try {
  //       const allPost = await axios.get(
  //         `${process.env.REACT_APP_BASIC_URL}/getpost`,
  //         { headers: { Authorization: `Bearer ${state.signIn.token}` } }
  //       );
  //       console.log("posts", allPost.data);

  //         // const data = {
  //         //   name: allPost.data,
  //         // };
  //         // dispatch(getTasks(data));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const createPost = async() => {
  //     console.log("postadd", postadd);
  //     if (postadd.length > 0) {
  //         const newPost = await axios.post(
  //         `${process.env.REACT_APP_BASIC_URL}/post`,
  //         {  disc: postadd },
  //         { headers: { Authorization: `Bearer ${state.signIn.token}` } }
  //       );
  //       console.log(" newPost.data", newPost.data)
  //     //   const data = {
  //     //     task: newPost.data,
  //     //   };
  //     //   dispatch(addTask(data));
  //     }

  //     setPostadd("");

  //   };

  //   const deletepost = async (taskId, i) => {

  // //     try {
  // //         await axios.delete(`${process.env.REACT_APP_BASIC_URL}/task/${taskId}`, {
  // //           headers: {
  // //             Authorization: `Bearer ${state.signIn.token}`,
  // //           },
  // //         });

  // //         const data = {
  // //             index: i,
  // //           };
  // //           dispatch(deleteTask(data));
  // //       } catch (error) {
  // //         console.log(error);
  // //       }
  //   };

  //   const updatepost = async(_id, i) => {
  // //     if (taskName.length > 0) {
  // //       const newTask=await axios.put(
  // //         `${process.env.REACT_APP_BASIC_URL}/task`,
  // //         { taskId: _id, taskName: taskName },
  // //         { headers: { Authorization: `Bearer ${state.signIn.token}` } }
  // //       );
  // //       const data = {
  // //         newTask:newTask.data,
  // //         indx:i
  // //       };
  // //       dispatch(updateTask(data));
  // //     }

  // //     setTaskname("");

  //   };

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
      <input
        type="text"
        value={postadd}
        onChange={(e) => {
          setPostadd(e.target.value);
        }}
      />
      <button  onClick={createPost}>add post</button>
      {/* <button>add post</button> */}

      {state.posts.name.length &&
        state.posts.name.map((item, i) => {
          // console.log("item", item);
          return (
            <div key={item._id}>
              <h1>{item.name}</h1>
              {/* <button onClick={() => deletepost(item._id, i)}>delete</button> */}
              <button>delete</button>
              <input
                type="text"
                //   value={taskName}
                onChange={(e) => {
                  setPostName(e.target.value);
                }}
              />
              {/* <button onClick={() => updatepost(item._id, i)} >update</button> */}
              <button>update</button>
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
