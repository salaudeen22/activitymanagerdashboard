
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css"
import Authecation from './Screen/Authecation';
import React, { useState, useEffect } from "react";
import Dashboard from './Screen/Dashboard.jsx';
import Sidebar from './Component/Sidebar.jsx';
import Analytics from "./Screen/Analytics.jsx";


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
 
  return (
    <div>
      <Router>
      <Sidebar isSidebarOpen={isSidebarOpen} />
        <Routes>
          <Route path="/" element={<Authecation/>} />
          <Route path="/home" element={<Dashboard/>} />
          <Route path="/Analytics" element={<Analytics/>} />

       
        </Routes>
      </Router> 
 
    </div>
  )
}

export default App