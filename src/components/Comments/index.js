import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../Header";

function Comments() {

  const [post,setPost]=useState([]);
  const [comment,setComment]=useState([]);
  const [commentName, setCommentName] = useState("");
  const [commentadd, setCommentadd] = useState("");
  const [delett,setDelett]=useState(false);

  const {id}=useParams();

  const state = useSelector((state) => {
    console.log("state.signIn.token", state.signIn.token);
    // console.log("state.tasks", state.tasks);
    return state;
  });

  const getuserpost = async () => {
    try {
      const userPosts = await axios.post(
        `${process.env.REACT_APP_BASIC_URL}/getPostId`,{postId:id},
        { headers: {Authorization: `Bearer ${state.signIn.token}` } }
      );
      console.log("userPosts", userPosts.data.resul[0]);
      console.log("userComment", userPosts.data.result);
    setPost(userPosts.data.resul[0]);
    setComment(userPosts.data.result)

    } catch (error) {
      console.log(error);
    }
  };

  const createcomment = async () => {
    if (commentadd) {
      const newComment = await axios.post(
        `${process.env.REACT_APP_BASIC_URL}/comment`,
        { disc: commentadd ,post:id},
        { headers: { Authorization: `Bearer ${state.signIn.token}` } }
      );
      console.log("newComment",newComment.data);
     
       setCommentadd("");
       getuserpost();
    }
  };

  const deletecomment = async (_id) => {

    try {
       await axios.delete(`${process.env.REACT_APP_BASIC_URL}/comment/${_id}`, {
         headers: {
           Authorization: `Bearer ${state.signIn.token}`,
         },
       });
       setDelett(!delett);
       getuserpost();
        
     } catch (error) {
       console.log(error);
     }
 };

 const updatcomment = async(iid) => {
    if (commentName.length > 0) {
     const newpost=await axios.put(
       `${process.env.REACT_APP_BASIC_URL}/post`,
       {_id:iid, disc: commentName,post:id },
       { headers: { Authorization: `Bearer ${state.signIn.token}` } }
     );
    
    }
    getuserpost();
    setCommentName("");

  };

  // const out = () => {
  //   dispatch(logout({ role: "", token: "" }));
  //   // dispatch(add({name:[]}));
  //   navigate(`/account`);
  // };
  useEffect(() => {
    getuserpost();
  }, []);


    return (
        <div>
          <Header />
            <div>
            <img src={post.image} alt="post imag" width="500" height="600"></img>
              <h1>{post.disc}</h1>
              <p>{post.time}</p>
                
                {console.log("post.disc",post.disc)}
            </div>
            <input
        type="text"
        value={commentadd}
        onChange={(e) => {
          setCommentadd(e.target.value);
        }}/>
        <button  onClick={createcomment}>add comment</button>
            {(comment&&comment.length)&&comment.map((item)=>{
                return (
                <div key={item._id}>
                 <h1>{item.disc}</h1>
              {(state.signIn.userId===item.user||state.signIn.userId===item.post||state.signIn.role==="admin")&&
              <button onClick={() => deletecomment(item._id)}>delete</button>}
  
              {state.signIn.userId===item.user&&<><input
                type="text"
               
                onChange={(e) => {
                  setCommentName(e.target.value);
                }}
              />
              <button onClick={() => updatcomment(item._id)} >update</button></>}
            
            </div>
          );
        })}
         {/* <button onClick={out}>LogOut</button>     */}
               
         
            
        </div>
    )
}

export default Comments
