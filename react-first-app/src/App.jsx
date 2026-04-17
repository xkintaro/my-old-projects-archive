import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './assets/css/app.css';
import Header from './assets/components/Header'
import Home from './assets/pages/Home'

import Test from './assets/pages/Test'

import Shop from './assets/pages/Shop'
import Friends from './assets/pages/Friends'
import Login from './assets/pages/Login'
import Login2 from './assets/pages/LoginStep2'
import Login3 from './assets/pages/Login3'
import Register from './assets/pages/Register'
import Register2 from './assets/pages/Register2'
import Register3 from './assets/pages/Register3'
import Register4 from './assets/pages/Register4'
import SifremiUnuttum from './assets/pages/SifremiUnuttum'
import SifremiUnuttum2 from './assets/pages/SifremiUnuttum2'
import SifremiUnuttum3 from './assets/pages/SifremiUnuttum3';
import Profile from './assets/pages/Profile';
import Settings from './assets/pages/Settings';

function App() {

  return (

    <Router>

      <div className="container">

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/test" element={<Test />} />

          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login2" element={<Login2 />} />
          <Route path="/login3" element={<Login3 />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register2" element={<Register2 />} />
          <Route path="/register3" element={<Register3 />} />
          <Route path="/register4" element={<Register4 />} />
          <Route path="/sifremiunuttum" element={<SifremiUnuttum />} />
          <Route path="/sifremiunuttum2" element={<SifremiUnuttum2 />} />
          <Route path="/sifremiunuttum3" element={<SifremiUnuttum3 />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings/*" element={<Settings />} />

        </Routes>

      </div>

    </Router>

  )
}

export default App
