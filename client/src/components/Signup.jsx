// import { SelectField } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Signup() {
  const [name, setName] = useState("")  
  const [email, setEmail] = useState("")  
  const [role, setRole] = useState("" ||"VIEW_ALL")  
  const [password, setPassword] = useState("")

  const navigate=useNavigate()
  
  const handleRegister = ()=>{
    const data = {
        name,email,password,role
    }
    // console.log(data)
    fetch("https://english-quest-tgky.onrender.com/users/register",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(data)
    })
    .then(res => res.json())
    .then((data) =>{
        console.log(data)
        alert(data.msg);
        navigate("/login")
    })         
    .catch(err => {
        console.log(err)
        alert(err.msg)
    })
  }

  return (
    <DIV>
    <SignupContainer>
    <SignupTitle>Register a new user</SignupTitle>
    <InputField
      type="text"
      value={name}
      placeholder="Enter username..."
      onChange={(e) => setName(e.target.value)}
    />
    <InputField
      type="email"
      value={email}
      placeholder="Enter email..."
      onChange={(e) => setEmail(e.target.value)}
    />
    <InputField
      type="password"
      value={password}
      placeholder="Enter password..."
      onChange={(e) => setPassword(e.target.value)}
    />
     <SelectField value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="VIEW_ALL">VIEW_ALL</option>
          <option value="CREATOR">CREATOR</option>
        </SelectField>
    <RegisterButton onClick={handleRegister}>Register</RegisterButton>
  </SignupContainer>
</DIV>
  )
}



const SignupContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #ffffff;
`;

const SignupTitle = styled.h1`
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

const RegisterButton = styled.button`
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


const SelectField = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  appearance: none; /* Remove default arrow on some browsers */
  background-color: #fff; /* Set background color */
  background-image: url('data:image/svg+xml;utf8,<svg fill="%23444" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'); /* Add a custom arrow icon */
  background-repeat: no-repeat;
  background-position: right 10px center;
  appearance: none;
  cursor: pointer;

  &:hover, &:focus {
    border-color: #4caf50; /* Change border color on hover/focus */
  }
`;