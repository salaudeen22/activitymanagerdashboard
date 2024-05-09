import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css"
import Authecation from './Screen/Authecation';

import Dashboard from './Screen/Dashboard.jsx';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Authecation/>} />
          <Route path="/home" element={<Dashboard/>} />

       
        </Routes>
      </Router> 
 
    </div>
  )
}

export default App
