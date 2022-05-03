import React, {useEffect, useState} from "react";
import {useNavigate } from "react-router-dom";

export default function Login(){

    const[email, setEmail]= useState("");
    const[password, setPassword] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
    const auth = localStorage.getItem('user')
    if(auth){
        navigate('/')
    }
    },[])

    const LoginClick = async ()=>{
      let data = await fetch('http://localhost:5000/login',{
          method: 'post',
          body: JSON.stringify({email, password}),
          headers:{
              'Content-Type':'application/json'
          }
      });
      data = await data.json();
      if(data.auth){
          localStorage.setItem('user', JSON.stringify(data.user))
          localStorage.setItem('token', JSON.stringify(data.auth))
          navigate('/')
      } else{
          alert("User Not Found")
      }
    }

    return(
        <div className="registernew">
            <h2 >Login</h2>
            <dl className="w-25">
                <dt><span className="bi bi-people-fill"></span> User Name</dt>
                <dd>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" className="form-control"  />
                </dd>
                <dt><span className="bi bi-key-fill"></span> Password</dt>
                <dd>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="eff form-control" />
                </dd>
                <dd className="d-grid">
                    <button className="btn btn-success" onClick={LoginClick}>Login</button>
                </dd>
            </dl>
        </div>
    )
}