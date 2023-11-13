import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App.jsx'
import Layout from './routes/Layout';
import CreatePost from './routes/CreatePost';
import Post from './routes/Post.jsx';
import EditPost from './routes/EditPost.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
           <Route path="/" element={<Layout />}>
              <Route index={true} element={<App />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/view/:id" element={<Post />} />
              <Route path="/edit/:id" element={<EditPost/>} />
           </Route>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
