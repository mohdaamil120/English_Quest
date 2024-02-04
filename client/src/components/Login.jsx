import React,{useState} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

export default function Login() {  
    const [email, setEmail] = useState("")  
    const [password, setPassword] = useState("")
  
    const navigate = useNavigate()

    const handleLogin = ()=>{
      const data = {
          email,password
      }
      // console.log(data)
      fetch("https://english-quest-tgky.onrender.com/users/login",{
          method:"POST",
          headers:{
              "Content-type":"application/json"
          },
          body:JSON.stringify(data)
      })
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        localStorage.setItem("token", data.token)
        alert(data.msg);
        navigate("/books")
       })
      .catch(err => {
        console.log(err)
        alert(err.msg);
      })
    }
  
    return (
      <DIV>
      <LoginContainer>
     
      <LoginTitle>Login with your credentials</LoginTitle>
      <InputField type="email" value={email} placeholder='Enter email...' onChange={(e) => setEmail(e.target.value)}/>
      <InputField type="password" value={password} placeholder='Enter password...' onChange={(e) => setPassword(e.target.value)}/>
      <LoginButton onClick={handleLogin}>Login</LoginButton>
     
      </LoginContainer>
      </DIV>
    )
}



const LoginContainer = styled.div`
  margin-top: 20px;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #ffffff;
  height: 70vh;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const LoginTitle = styled.h1`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const DIV = styled.div`
  background-color: #f8cfcf;
  height: 100vh;
`