import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import CreatePost from './Pages/CreatePost'
import PostDetails from './Pages/PostDetails'
import EditPost from './Pages/EditPost'
import MyBlogs from './Pages/MyBlogs'
import Profile from './Pages/Profile'


function App() {
  return (
    <>
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/register' element={<Register />} />
      <Route exact path='/write' element={<CreatePost />} />
      <Route exact path='/Post/post/:id' element={<PostDetails />} />
      <Route exact path='/edit/:id' element={<EditPost />} />
      <Route exact path='/myblogs/:id' element={<MyBlogs />} />
      <Route exact path='/profile/:id' element={<Profile />} />


    </Routes>
    </>
  )
}

export default App