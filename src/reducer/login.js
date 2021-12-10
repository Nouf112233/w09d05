const instialState ={
    role:"",
    token:""
};
const signIn=(state=instialState,action)=>{
    const { type,payload}=action;
    switch (type){
        case "LOGIN":
            const {role,token}=payload;
            localStorage.setItem("Token",token);
            localStorage.setItem("Role",role);
            return{role,token};
        case "LOGOUT":
            localStorage.clear();
            return{role:"",token:""};
        default:
            const tokenStorage=localStorage.getItem("Token");
            const roleStorage=localStorage.getItem("Role");
            if(tokenStorage){
                return {token:tokenStorage,role:roleStorage}
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