const instialState = {
    name: [],
  };
  const posts = (state = instialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case "GET_ALL_POSTS":
        const { name } = payload;
        return { name };
      case "ADD_POST":
        const { post } = payload;
        //   console.log("data",{...state.name,task})
  
        return { ...state.name, post };
      case "DELETE_POST":
        const { index } = payload;
        const newName = state.name.filter((item, i) => {
          return i != index;
        });
  
        return { name: newName };
      case "UPDATE_POST":
        const { newPost,indx } = payload;
        console.log("newPost",newPost.data);
        const newname = state.name.map((item, i) => {
            if(i===indx){
                
                return newPost;
            }else{
              return item;
            }
         
        });
        return { name: newname };
  
       
      default:
        return state;
    }
  };
  
  export default posts;
  
  export const getPosts = (data) => {
    return {
      type: "GET_ALL_POSTS",
      payload: data,
    };
  };
  
  export const addPost = (data) => {
    return {
      type: "ADD_POST",
      payload: data,
    };
  };
  
  export const deletePost = (data) => {
    return {
      type: "DELETE_POST",
      payload: data,
    };
  };
  
  export const updatePost = (data) => {
      return {
        type: "UPDATE_POST",
        payload: data,
      };
    };