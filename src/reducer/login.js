const instialState ={
    role:"",
    token:"",
    userId:""
};
const signIn=(state=instialState,action)=>{
    const { type,payload}=action;
    switch (type){
        case "LOGIN":
            const {role,token,userId}=payload;
            localStorage.setItem("Token",token);
            localStorage.setItem("Role",role);
            localStorage.setItem("UserId",userId);
            return{role,token,userId};
        case "LOGOUT":
            localStorage.clear();
            return{role:"",token:"",userId:""};
        default:
            const tokenStorage=localStorage.getItem("Token");
            const roleStorage=localStorage.getItem("Role");
            const userIdStorage=localStorage.getItem("UserId");
            if(tokenStorage){
                return {token:tokenStorage,role:roleStorage,userId:userIdStorage}
            }else{
                return state;
            }
            
    }
}

export default signIn;


export const login=(data)=>{
    return {
        type:"LOGIN",
        payload:data
    };
};

export const logout=(data)=>{
    return {
        type:"LOGOUT",
        payload:data
    };
};