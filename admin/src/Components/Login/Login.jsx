// src/Login/Login.js
import React, { useContext, useState } from 'react';
import './Login.css';
import login_img from '../../assets/Login.avif'
import leaf_login from '../../assets/leaf_login.jpg'
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword]=useState('');
  const handleInputChange = (e)=>{
    const {name, value}=e.target;
    if(name === 'username'){
      setUsername(value);
    }else if(name === 'password'){
      setPassword(value);
    } 
  };
  const login= async(e)=>{
    e.preventDefault();
    const data={
      username:username,
      password:password
    }
    try{
    const response= await fetch('http://localhost:4000/admin/login',{
      method:'Post',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data) 
    })
    const result= await response.json();
    console.log(result);
    if(result.success){
    const token=result.token;
    localStorage.setItem('token',token);
    toast.success('Login Successful');
    setTimeout(() => {
      window.location.href = '/admin/dashboard';
    }, 2000)
    }else{
      toast.error(result.message);
    }
  }catch(error){
    toast.error(result.message);
  }
}
  return (
    <div className="login">   
    <div className="login-left">
    <img src={login_img} alt="" />
    </div>
    <div className="login-right">
    <h5>ADMIN LOGIN</h5>
    <input type="text" name='username' value={username} placeholder='username' onChange={handleInputChange} className="username" />
    <br/>
    <input type="password" name='password' value={password} placeholder='password' onChange={handleInputChange} className="password" />
    <Link to="/register"><p>Doesn't have an account? Sign Up Now</p></Link>
    <button type='submit'  className="login-button" onClick={login}>Login</button>
    <img src={leaf_login} alt="" />
    </div>
    <ToastContainer/> 
    </div>
  );
};

export default Login;
