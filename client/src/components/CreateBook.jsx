import React,{useState} from 'react'
import styled from 'styled-components'

export default function CreateBook() {  
    const [title, setTitle] = useState("")  
    const [body, setBody] = useState("")
  
    const handleSubmit = ()=>{
      const data = {
          title, body
      }
      // console.log(data)
      fetch("https://ruby-pigeon-cap.cyclic.app/notes/create",{
          method:"POST",
          headers:{
              "Content-type":"application/json",
              "Authorization":`Bearer ${localStorage.getItem("token")}`
          },
          body:JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        alert(data.msg)
    })
      .catch(err => {
        console.log(err)
        alert(err.msg)
    })
  
    }
  
    return (
        <CreateNoteContainer>
        <CreateNoteTitle>Create a new note</CreateNoteTitle>
        <InputField
          type="text"
          value={title}
          placeholder="Enter title..."
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextAreaField
          type="text"
          value={body}
          placeholder="Enter description..."
          onChange={(e) => setBody(e.target.value)}
        />
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
      </CreateNoteContainer>
    )
}



const CreateNoteContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #ffffff;
`;

const CreateNoteTitle = styled.h1`
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

const TextAreaField = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
`;

const SubmitButton = styled.button`
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