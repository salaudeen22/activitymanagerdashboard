import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const SummaryPieGraph = ({ data }) => {
  if (!data.screendata || data.screendata.length === 0) {
    return <div>No screen data available</div>;
  }

  const currentDate = new Date(); 
  const currentWeekStart = new Date(currentDate); 
  currentWeekStart.setDate(currentDate.getDate() - currentDate.getDay()); 

  const currentWeekEnd = new Date(currentWeekStart); 
  currentWeekEnd.setDate(currentWeekStart.getDate() + 6); 

  const screendata = data.screendata;
  const urlMap = new Map();

  screendata.forEach(item => {
    const dataValues = Object.values(item);
    dataValues.forEach(value => {
      const timeStamp = value.lastDateVal;
      const date = new Date(timeStamp);
   
      if (date >= currentWeekStart && date <= currentWeekEnd) {
        const url = value.url;
        const trackedHours = value.trackedSeconds / 3600; // Convert seconds to hours
        
        if (urlMap.has(url)) {
          urlMap.set(url, urlMap.get(url) + trackedHours);
        } else {
          urlMap.set(url, trackedHours);
        }
      }
    });
  });

  const dummyData = Array.from(urlMap.entries()).map(([url, trackedHours]) => ({
    url,
    trackedHours, // Use trackedHours instead of trackedSeconds
  }));

  return (
    <div className="graphContainer">
      <div className="graphCard">Weekly Website Usage</div>
      <div className="graphContent">
        <PieChart
          series={[
            {
              data: dummyData.map((item) => ({
                argument: item.url,
                value: item.trackedHours, // Use trackedHours instead of trackedSeconds
                label: `${item.url} (${Math.round(item.trackedHours)}h)`, // Round hours
              })),
              innerRadius: 30,
              outerRadius: 120,
              paddingAngle: 5,
              cornerRadius: 5,
            },
          ]}
          height={300}
        />
      </div>
    </div>
  );
};

export default SummaryPieGraph;
