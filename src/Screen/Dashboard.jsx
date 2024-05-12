import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Component/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { universalurl } from "../Utils/helper";
import HomePage from "./HomePage";

function Dashboard() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [user, setUser] = useState("YourUsername");
  const [data, setData] = useState({});
  const navigate = useNavigate();

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

  useEffect(() => {
    const UserData = async () => {
      const email = localStorage.getItem("userEmail");
      try {
        const response = await fetch(`${universalurl}api/displayuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        });
        const json = await response.json();
        console.log(json);
        setData(json);
        setUser(json.name); 
      } catch (error) {
        console.error(error);
      }
    };
    UserData(); 
  }, []); 

  return (
    <>
    <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="Container">
        <main>
          <nav>
            <button onClick={toggleSidebar} id="tooglebutton">
             x
            </button>
            <h1>
              Good Day, <span>{user}</span>
            </h1>
            <ul>
              <li className="bell">
                <FontAwesomeIcon icon={faBell} />
              </li>
              <li className="bell">
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
          
          <HomePage data={data}/>

         
        </main>
      </div>
    </>
  );
}

export default Dashboard;