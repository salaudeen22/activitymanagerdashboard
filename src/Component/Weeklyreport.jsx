// import React from 'react';
// import { BarChart } from '@mui/x-charts/BarChart';

// function Weeklyreport({ data, webdata }) {
//     if (!data || !data.screendata || data.screendata.length === 0) {
//         return <div>No screen data available</div>;
//     }

//     // Dummy data for testing
//     const dummyData = [
//         { date: '2024-05-01', category: 'Productivity', trackedHours: 10 },
//         { date: '2024-05-01', category: 'Entertainment', trackedHours: 5 },
//         { date: '2024-05-01', category: 'Distraction', trackedHours: 8 },
//         { date: '2024-05-02', category: 'Productivity', trackedHours: 8 },
//         { date: '2024-05-02', category: 'Entertainment', trackedHours: 6 },
//         { date: '2024-05-02', category: 'Distraction', trackedHours: 7 },
//         // Add more data for other dates as needed
//     ];

//     // Extract unique dates and categories
//     const uniqueDates = [...new Set(dummyData.map(item => item.date))];
//     const uniqueCategories = [...new Set(dummyData.map(item => item.category))];

//     // Prepare data for the BarChart component
//     const seriesData = uniqueDates.map(date => {
//         const data = uniqueCategories.map(category => {
//             const item = dummyData.find(d => d.date === date && d.category === category);
//             return item ? item.trackedHours : 0;
//         });
//         return { date, data };
//     });

//     const xAxisData = uniqueCategories;

//     return (
//         <div className='weekreportGraph'>
//             <div className='chart-label'>Weekly Report</div>
//             <div className='chart-container'>
//                 <BarChart
//                     className='chart'
//                     xAxis={[{ scaleType: 'band', data: xAxisData }]}
//                     series={seriesData}
//                     width={300}
//                     height={300}
//                     xAxisLabel="Categories"
//                     yAxisLabel="Tracked Hours"
//                 />
//             </div>
//         </div>
//     );
// }

// export default Weeklyreport;
import React from 'react'

function Weeklyreport() {
  return (
    <div>Weeklyreport</div>
  )
}

export default Weeklyreport