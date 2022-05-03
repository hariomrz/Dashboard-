import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register(){
    const[name, setName]= useState("")
    const[email, setEmail]= useState("")
    const[password, setPassword]= useState("")
    const navigate = useNavigate();

    useEffect(()=>{
        const auth= localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    }, [])

       const handleRegister= async () =>{
         let result = await fetch('http://localhost:5000/register', {
          method: 'post',
          body: JSON.stringify({name, email, password}),
          headers:{
              'Content-Type': 'application/json'
          },
      });
      result = await result.json()
      console.log(result)
      localStorage.setItem('user', JSON.stringify(result.result))
      localStorage.setItem('token', JSON.stringify(result.auth))
       navigate('/')

    }

    return(
        <div className="register">
          <h1>Register</h1>
          <dl className="w-25">
              <dt>User Name</dt>
              <dd>
                  <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name" className="form-control" />
              </dd>
              <dt>Email</dt>
              <dd>
                  <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" className="form-control" />
              </dd>
              <dt>Password</dt>
              <dd>
                  <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"  className="form-control" />
              </dd>
              <dd className="d-grid">
              <button onClick={handleRegister} className="btn btn-info">Register</button>
              </dd>
          </dl>
             
        </div>
    )
}