import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Component/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import TotalScreenTime from "../Component/TotalScreenTime";
import AverageScreenTime from "../Component/AverageScreenTime";
import SummaryPieGraph from "../Component/SummaryPieGraph";

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
        const response = await fetch("http://localhost:4000/api/displayuser", {
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
      <Sidebar isSidebarOpen={isSidebarOpen} />
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

          <div className="section-1">
            <div className="headerSection">
                <TotalScreenTime data={data}/>
                <AverageScreenTime  data={data}/>
             
            </div>
            <SummaryPieGraph data={data}/>
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
