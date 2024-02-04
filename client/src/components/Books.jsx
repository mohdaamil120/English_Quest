import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Textarea, Input, useDisclosure } from "@chakra-ui/react";
import styled from 'styled-components';


export default function Books() {
  const [data,setData] = useState([])
  const [render,setRender] = useState(false)
  const [editedNote, setEditedNote] = useState({ id: '', title: '', body: '' });
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(()=>{
    fetch("https://english-quest-tgky.onrender.com/books",{
          headers:{
              "Content-type":"application/json",
              "Authorization":`Bearer ${localStorage.getItem("token")}`
          }
      })
      .then(res => res.json())
      .then((data) => {
        // console.log("insideUseEffect",data)
        setData([...data])
      })
      .catch(err => console.log(err))

  },[render])

  const handleDelete = (id)=>{
    fetch(`https://english-quest-tgky.onrender.com/books/delete/${id}`,{
          method:"DELETE",
          headers:{
              "Content-type":"application/json",
              "Authorization":`Bearer ${localStorage.getItem("token")}`
          }
      })
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        setData((prevData) => prevData.filter((note) => note._id !== id))
        alert(data.msg);
      })
      .catch(err => {
        console.log(err)
        alert(err.msg)
    })
      setRender((prev)=>!prev)
  }


  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedNote((prevNote) => ({ ...prevNote, [name]: value }));
  }


  const handleEditSubmit = () => {
    fetch(`https://english-quest-tgky.onrender.com/books/update/${editedNote.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        title: editedNote.title,
        body: editedNote.body
      })
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        setData((prevData) => prevData.map((note) => (note._id === editedNote.id ? { ...note, title: editedNote.title, body: editedNote.body } : note)));
        alert(data.msg);
        // handleCloseEditModal();
      })
      .catch(err => {
        console.log(err)
        alert(err.msg);
    });

    setRender((prev) => !prev);
    onClose();
  }

  
  const handleEditClick = (note) => {
    onOpen(); // Open the modal
    setEditedNote({ id: note._id, title: note.title, body: note.body });
  }

  return (
    <NotesContainer>
    <div   >
        <h1 className='head' >All the books are here</h1>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {
            data?.map((el)=>{
                // console.log(el)
                return(
                    
                    <tr id='card' key={el._id}>
                        <td>{el.title}</td>
                        <td>{el.description}</td>
                        <td>{el.price}</td>
                        <td>{el.category}</td>
                        <td><button onClick={() => handleEditClick(el._id)}>Edit</button></td>
                        <td><button onClick={()=>handleDelete(el._id)} >Delete</button></td>
                    </tr>
                    
                )
            })
        } 
            </tbody>
        </table>

        <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Edit Note</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <label>Title:</label>
                    <Input type="text" name="title" value={editedNote.title} onChange={handleEditInputChange} />
                    <label>Body:</label>
                    <Textarea name="body" value={editedNote.body} onChange={handleEditInputChange} />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3}  onClick={handleEditSubmit}>
                    Submit
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>

    </div>
    </NotesContainer>
  )
}



const NotesContainer = styled.div`
 background-color: #091758;
  padding: 20px;
  border-radius: 5px;

  h1{
    color: white;
    font-size: 30px;
  }

  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    color: white;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }

  th {
    background-color: #35424a;
    color: white;
  }

  td {
    background-color: #4a5a63;
  }

  button {
    background-color: #4caf50;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #388e3c;
    }
  }

  // Optional: Add hover effect for rows
  tbody tr:hover {
    background-color: #2c3940;
  }

  // Optional: Style the modal
  ModalContent {
    background-color: #1a2026;
    color: white;
    border-radius: 8px;
  }

  label {
    color: white;
  }
`;



// const NoteCard = styled.div`
//   background-color: #090958;
//   color: white;
//   margin-bottom: 20px;
//   padding: 15px;
//   border-radius: 8px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

//   h3 {
//     font-size: 20px;
//     margin-bottom: 10px;
//   }

//   p {
//     font-size: 16px;
//   }

//   button {
//     margin-right: 10px;
//     background-color: #4caf50;
//     color: white;
//     padding: 8px 12px;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
//     transition: background-color 0.3s ease;

//     &:hover {
//       background-color: #388e3c; /* Darker green color on hover */
//     }
//   }
// `;