import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
function App() {
  const navigate = useNavigate()
  const [details, setDetails] = useState({
    userName:'',
    password:'',
    email:''
  })

  const formChange = (e) => {
    const {name, value} = e.target;
    setDetails({
      ...details,
      [name]:value
    })
  }

  const registerUser = async (e) => {
    e.preventDefault();
    const {userName, email, password} = details
    const response = await fetch('http://localhost:3001/api/register',{
      method:"POST",
      headers:{
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        userName,
        email,
        password,
      })
    })
    const data = await response.json();
    if(data.status === 'OK'){
      navigate('/login')
    }
    console.log(data);
    // console.log(details)
  }
  return (
    <div>
      <h1>Register User</h1>
      <form action="" onSubmit={registerUser}>
        <div>
          <label htmlFor="name"> Name </label>
          <input type="text" id="name" name="userName" onChange={formChange} value={details.userName}/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={formChange} value={details.password}/>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={formChange} value={details.email}/>
        </div>
        <input type="submit" name="submit"/>
      </form>
    </div>
  );
}

export default App;
