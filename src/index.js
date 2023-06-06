import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home.js'
import Nav from './components/nav.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Nav />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
