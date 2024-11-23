import React from 'react'
import { Chart } from "react-google-charts";
import "./Home.css"


const Home = () => {

  const pieChartData = [
    ["Task", "Hours per Day"],
    ["Work", 9],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];

  const pieChartOptions = {
    title: "My Daily Activities",
    
  };

  const columnChartData = [
    ["Element", "Density", { role: "style" }],
    ["Work", 8.94, "blue"], // RGB value
    ["Eat", 10.49, "silver"], // English color name
    ["Commute", 19.3, "gold"],
    ["Sleep", 21.45, "color: #e5e4e2"], // CSS-style declaration
  ];

  const barChartData = [
    [
      "Element",
      "Density",
      { role: "style" },
      {
        role: "annotation",
        type: "string",
      },
    ],
    ["Copper", 8.94, "#b87333", "Cu"],
    ["Silver", 10.49, "silver", "Ag"],
    ["Gold", 19.3, "gold", "Au"],
    ["Platinum", 21.45, "color: #e5e4e2", "Pt"],
  ];

  const barChartoptions = {
    title: "Density of Precious Metals, in g/cm^3",
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
  };


  return (
    <div>
      <p>ss</p>

      <div class="grid-container">
        <div class="grid-item"><Chart
          chartType="PieChart"
          data={pieChartData}
          options={pieChartOptions}
          width={"100%"}
          height={"300px"}
        /></div>
        
        <div class="grid-item">

          <Chart chartType="ColumnChart" width="100%" height="100%" data={columnChartData} />
        </div>


        <div class="grid-item">
        <Chart
          chartType="BarChart"
          width="100%"
          height="100%"
          data={barChartData}
          options={barChartoptions}
        />
        </div>  
      </div>

      
    



    </div>
  )
}

export default Home;
