import { createStore,combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import signIn  from "./login";
import posts from "./post";
// import users from "./user";

const reducers=combineReducers({signIn,posts});


const store=()=>{
    return createStore(reducers,composeWithDevTools());
};

export default store();