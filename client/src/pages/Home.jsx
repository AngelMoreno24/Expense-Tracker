import React from 'react'
import { Chart } from "react-google-charts";
import "./Home.css"


const Home = () => {




  const pieChartData = [
    ["Task", "Hours per Day"],
    ["Work", 9 ],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];

  const pieChartOptions = {
    legend: "none", // This removes the legend
    title: "My Daily Activities",
    backgroundColor: '#1f1f1f',
    titleTextStyle: { color: 'white' },
    legendTextStyle: { color: 'white' },

    colors: ["#003f5c", "#58508d", "#bc5090", "#ff6361", "#ffa600"], // Custom colors

    pieSliceBorderColor: "#000000", // Border color (black in this case)
    
  };

  const columnChartData = [
    ["Element", "Density", { role: "style" }],
    ["Work", 8.94, "#003f5c"], // RGB value
    ["Eat", 10.49, "#58508d"], // English color name
    ["Commute", 19.3, "#bc5090"],
    ["Sleep", 21.45, "color: #ff6361"], // CSS-style declaration
    ["Sleep", 21.45, "color: #ffa600"], // CSS-style declaration
  ];
  const columnChartOptions={
    title: "<Month> Spending",
    backgroundColor: '#1f1f1f',
    titleTextStyle: { color: 'white' },
    legend: "none", // This removes the legend
    colors: ["#4285F4", "#DB4437", "#F4B400"], // Custom slice colors
    pieSliceBorderColor: "#000000", // Border color (black in this case)
    pieSliceText: "value", // Optional, text displayed on slices
  }
  const barChartData = [
    ["Category", "Segment 1", { role: "style" }, "Segment 2", { role: "style" }, "Segment 3", { role: "style" }, "Segment 4", { role: "style" }, "Segment 5", { role: "style" }],
    ["Jan", 112, "003f5c", 355, "#58508d", 298, "#bc5090", 374, "#ff6361", 132, "#ffa600"],
    ["Feb", 233, "003f5c", 149, "#58508d", 391, "#bc5090", 208, "#ff6361", 177, "#ffa600"],
    ["Mar", 397, "003f5c", 319, "#58508d", 132, "#bc5090", 281, "#ff6361", 364, "#ffa600"],
    ["Apr", 283, "003f5c", 95, "#58508d", 192, "#bc5090", 343, "#ff6361", 298, "#ffa600"],
    ["May", 187, "003f5c", 237, "#58508d", 398, "#bc5090", 354, "#ff6361", 288, "#ffa600"],
    ["June", 341, "003f5c", 121, "#58508d", 227, "#bc5090", 112, "#ff6361", 298, "#ffa600"],
    ["July", 359, "003f5c", 192, "#58508d", 128, "#bc5090", 372, "#ff6361", 394, "#ffa600"],
    ["Aug", 229, "003f5c", 382, "#58508d", 245, "#bc5090", 198, "#ff6361", 139, "#ffa600"],
    ["Sept", 388, "003f5c", 268, "#58508d", 103, "#bc5090", 371, "#ff6361", 218, "#ffa600"],
    ["Oct", 354, "003f5c", 119, "#58508d", 241, "#bc5090", 359, "#ff6361", 173, "#ffa600"],
    ["Nov", 271, "003f5c", 397, "#58508d", 154, "#bc5090", 267, "#ff6361", 323, "#ffa600"],
    ["Dec", 320, "003f5c", 135, "#58508d", 265, "#bc5090", 387, "#ff6361", 311, "#ffa600"],
  
  ];

  const barChartoptions = {
    isStacked: true, // Stack segments in one bar
    title: "Monthly total",
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
    backgroundColor: '#1f1f1f',
    colors: ["#003f5c", "#58508d", "#bc5090", "#ff6361", "#ffa600"], // Custom colors
    pieSliceText: "value", // Optional, text displayed on slices
    titleTextStyle: {
      color: "white", // Title text color (orange)
      fontSize: 20, // Optional: Font size for the title
      bold: true, // Optional: Bold title text
    },
    hAxis: {
      title: "Values",
      textStyle: {
        color: "white", // Horizontal axis labels color (green)
        fontSize: 12, // Optional: Font size for horizontal axis labels
      },
      titleTextStyle: {
        color: "white", // Horizontal axis title color
      },
    },


  vAxis: {
    textStyle: {
      color: "white", // Vertical axis labels color (blue)
      fontSize: 12, // Optional: Font size for vertical axis labels
    },
    titleTextStyle: {
      color: "white", // Vertical axis title color
    },
  },
  };

  const data = [
    { label: "Food", color: "#003f5c" },
    { label: "Transportation", color: "#58508d" },
    { label: "Utilities", color: "#bc5090" },
    { label: "Entertainment", color: "#ff6361" },
    { label: "Others", color: "#ffa600" },
  ];





















  
  return (
    <div>

      <div>

        <label for="cars">Choose a car:</label>

        <select name="cars" id="cars">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
      </div>

      <div class="grid-container">
        <div class="grid-item"><Chart
          chartType="PieChart"
          data={pieChartData}
          options={pieChartOptions}
          width={"100%"}
          height={"300px"}
        /></div>
        
        <div class="grid-item">

          <Chart chartType="ColumnChart" width="100%" height="100%" data={columnChartData} options={columnChartOptions} />
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

      <div class="center">
      <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
      {data.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
             
            color: "white"
          }}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              backgroundColor: item.color,
              borderRadius: "50%",
            }}
          ></div>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
      </div>

      
    



    </div>
  )
}

export default Home;
