import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import CreateBook from './CreateBook'
import Books from './Books'

export default function MainRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/register' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/addbook' element={<CreateBook/>}/>
            <Route path='/books' element={<Books/>}/>
        </Routes>
    </div>
  )
}