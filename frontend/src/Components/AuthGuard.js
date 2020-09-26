const Auth = () =>{
    let token= localStorage.getItem('token');
    if(token!==null)
    return true;
    else
    return false; 
}

export default Auth;