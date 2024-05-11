import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function TopVisitWebsite({ data, webdata }) {
  if (!data || !data.screendata || data.screendata.length === 0 || !webdata || webdata.length === 0) {
    return <div>No screen data available</div>;
  }

  const currentDate = new Date(); 
  const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); 
  const currentMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); 

  const screendata = data.screendata;
  const urlMap = new Map();

  screendata.forEach(item => {
    const dataValues = Object.values(item);
    dataValues.forEach(value => {
      const timeStamp = value.lastDateVal;
      const date = new Date(timeStamp);

      if (date >= currentMonthStart && date <= currentMonthEnd) {
        const url = value.url;
        const trackedSeconds = value.trackedSeconds / 3600;

        if (urlMap.has(url)) {
          // If the URL already exists in the map, add the tracked seconds to its existing value
          urlMap.set(url, urlMap.get(url) + trackedSeconds);
        } else {
          // If the URL doesn't exist in the map, set the tracked seconds as its value
          urlMap.set(url, trackedSeconds);
        }
      }
    });
  });
  console.log(webdata);

  // Convert the map entries to an array of objects
  const dummyData = Array.from(urlMap.entries()).map(([url, trackedSeconds]) => ({
    url,
    trackedSeconds,
  }));

  // Sort the dummyData array based on tracked seconds
  dummyData.sort((a, b) => b.trackedSeconds - a.trackedSeconds);

  // Take the top six websites
  const topSixWebsites = dummyData.slice(0, 3);

  const handleRowClick = (url) => {
    // history.push(`/analytics?url=${encodeURIComponent(url)}`);
  };

  return (
    <div className="VisitBox">
      <div className="visitTitle">
        <h4>Top Visited Websites for the Month</h4>
      </div>
      <hr />
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Website</th>
              <th>Tracked Hours</th>
              <th>Flag</th> 
            </tr>
          </thead>
          <tbody>
          {topSixWebsites.map((item, index) => {
 const matchedWebData = webdata.find(web => web.url.includes(item.url));


  const flag = matchedWebData ? matchedWebData.flag : "Unknown";
  return (
    <tr key={index} onClick={() => handleRowClick(item.url)}>
      <td>{item.url}</td>
      <td>{item.trackedSeconds.toFixed(2)}</td>
      <td>{flag}</td> 
    </tr>
  );
})}

          </tbody>
          
        </table>
        <a href="#" className="viewallurl">
          View All website Visited <FontAwesomeIcon icon={faArrowRight} />
        </a>
      
      </div>
    </div>
  );
}

export default TopVisitWebsite;
