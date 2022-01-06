import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Jwt } from 'jsonwebtoken';
function Register() {
  const navigate = useNavigate()
  const [details, setDetails] = useState({
    password:'',
    email:'',
  })

  const formChange = (e) => {
    const {name, value} = e.target;
    setDetails({
      ...details,
      [name]:value
    })
  }

  const loginUser = async (e) => {
    e.preventDefault();
    const {email, password} = details
    const response = await fetch('http://localhost:3001/api/login',{
      method:"POST",
      headers:{
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      })
    })
    const data = await response.json();
    
    if(data.user){
      localStorage.setItem('token',data.user)
      alert('Login successful');
      navigate('/dashboard');
      // window.location.href='/dashboard'
    }else{
      alert('Incorrect username or password')
    }
    console.log(data);
    // console.log(details)
  }
  return (
    <div>
      <h1>Login User</h1>
      <form action="" onSubmit={loginUser}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={formChange} value={details.email}/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={formChange} value={details.password}/>
        </div>
        <input type="submit" name="submit"/>
      </form>
    </div>
  );
}

export default Register;
