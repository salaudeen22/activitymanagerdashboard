import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const SummaryPieGraph = ({ data }) => {
  
  if (!data.screendata || data.screendata.length === 0) {
    return <div>No screen data available</div>;
  }
  let screendata = data.screendata;
  console.log(screendata);

  
  let allData = [];
  for (let i = 0; i < screendata.length; i++) {
    const dataValues = Object.values(screendata[i]);
    allData.push(...dataValues);
  }
  

  allData.sort((a, b) => b.trackedSeconds - a.trackedSeconds);
  

  let newData = [];
  for (let j = 0; j < allData.length; j++) {
    newData.push({ url: allData[j].url, trackedSeconds: allData[j].trackedSeconds });
  }
  
  console.log(newData);
  

  const dummyData = newData;

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
