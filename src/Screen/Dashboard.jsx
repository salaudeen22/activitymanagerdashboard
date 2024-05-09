import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Component/Sidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate(); 

  const user = "YourUsername"; 

  const handleLogout = () => {
    localStorage.clear();
    navigate("/"); 
  };

  const handleAvatarClick = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className="Container">
        <main>
          <nav>
          <button onClick={toggleSidebar} id="tooglebutton">Toggle Sidebar</button>
            <h1>
              Good Day, <span>{user}</span>
            </h1>
            <ul>
              <li>
                <FontAwesomeIcon icon={faBell} />
              </li>
              <li>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </li>
              <li>
                <img
                  src="https://media.licdn.com/dms/image/D5603AQHZ89xeJ1dhcw/profile-displayphoto-shrink_800_800/0/1665927196286?e=2147483647&v=beta&t=LyMdQ8B1IhxZ9qwhZXelfuuzSdDUM-1TWs3TDMmzoZg"
                  alt="Avatar"
                  className="avatar"
                  onClick={handleAvatarClick}
                ></img>
                {dropdownVisible && (
                  <div className="dropdown-content">
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </main>
      </div>
    </>
  );
}

export default Dashboard;