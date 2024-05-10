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

  let screendata = data.screendata;
  let filteredData = [];

  for (let i = 0; i < screendata.length; i++) {
    const dataValues = Object.values(screendata[i]);
    for (let j = 0; j < dataValues.length; j++) {
      const timeStamp = dataValues[j].lastDateVal;
      const date = new Date(timeStamp);

   
      if (date >= currentWeekStart && date <= currentWeekEnd) {
        filteredData.push(dataValues[j]);
      }
    }
  }

  filteredData.sort((a, b) => b.trackedSeconds - a.trackedSeconds);

  const dummyData = filteredData.map((item) => ({
    url: item.url,
    trackedSeconds: item.trackedSeconds,
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
                value: item.trackedSeconds,
                label: `${item.url} (${Math.round(item.trackedSeconds)}s)`,
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
