import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import TopVisitWebsite from "../Component/TopVisitWebsite";
import Encourgamentbox from "../Component/Encourgamentbox";
import Weeklyreport from "../Component/Weeklyreport";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import BlockResist from "../Component/BlockResist";
import Sidebar from "../Component/Sidebar";

function Analytics() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [user, setUser] = useState("YourUsername");
  const [data, setData] = useState({});
  const [webdata, setWebdata] = useState([]);
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
        setData(json);
        setUser(json.name);
      } catch (error) {
        console.error(error);
      }
    };
    UserData();
  }, []);

  useEffect(() => {
    const UserData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/WebData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        setWebdata(json);
      } catch (error) {
        console.error(error);
      }
    };
    UserData();
  }, []);
console.log(data);
  return (
    <>
    <Sidebar isSidebarOpen={isSidebarOpen}  />
    
      <div className="Container">
        <main>
          <nav>
            <button onClick={toggleSidebar} id="tooglebutton">
              x
            </button>
            <h1>
              Good Day, <span>{user}</span>
            </h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="Adjust the Date" />
              </DemoContainer>
            </LocalizationProvider>
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

          <div className="section-2">
            <div className="middlesection">
              <TopVisitWebsite data={data} webdata={webdata} />
              <Encourgamentbox data={data} webdata={webdata} />
            </div>
            <div className="bottomsection">
              <Weeklyreport data={data} webdata={webdata} />
              <BlockResist data={data}/>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Analytics;
