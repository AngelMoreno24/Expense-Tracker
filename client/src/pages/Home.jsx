import React, {useState,useEffect} from 'react'
import { Chart } from "react-google-charts";
import axios from 'axios';
import "./Home.css"
import {pieChartOptions, columnChartOptions, barChartoptions, data} from "../chartOptions/chart"


const Home = () => {


  const [error, setError] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [token, setToken] = useState(null);
  const [pieChartData, setPieChartData] = useState('');



  useEffect(() => {
    
    const token = localStorage.getItem("accessToken");
    console.log(token);
    setToken(token);
    setPieChartData([
      ["Task", "Hours per Day"],
      ["Work", 9 ],
      ["Eat", 2],
      ["Commute", 2],
      ["Watch TV", 2],
      ["Sleep", 7],
    ]);
  },[]);



  const columnChartData = [
    ["Element", "Density", { role: "style" }],
    ["Work", 8.94, "#003f5c"], // RGB value
    ["Eat", 10.49, "#58508d"], // English color name
    ["Commute", 19.3, "#bc5090"],
    ["Sleep", 21.45, "color: #ff6361"], // CSS-style declaration
    ["Sleep", 21.45, "color: #ffa600"], // CSS-style declaration
  ];


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




  const tok = ()=>{
    
    const token = localStorage.getItem("accessToken");
    console.log(token);
  }


  const handleChange = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
  
      // Data to send
      const data = {
        account: "6744329ab290af96de65e837",
        year: "2024",
        month: "11",
      };
  
      // Use query parameters for GET
      const response = await axios.post("expenses/getMonthlyExpenses", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      console.log(response.data);
      setPieChartData(response.data);
  
      setError("");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Error logging in:", err);
    }
  };




  
  return (
    <div>

      <div className="date-container">
        <div className="date-container2">
            
          <label htmlFor="year" className="date-Item">year</label>

          <select name="cars" id="cars" className="date-Item" >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>

        </div>

        <div className="date-container2">
          <label htmlFor="month" className="date-Item">month</label>

          <select name="cars" id="cars" className="date-Item" >
            <option value="1">Jan</option>
            <option value="2">Feb</option>
            <option value="3">Mar</option>
            <option value="4">Apr</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">Aug</option>
            <option value="9">Sept</option>
            <option value="10">Oct</option>
            <option value="11">Nov</option>
            <option value="12">Dec</option>
          </select>
          
        </div>
      </div>

      <div className="grid-container">
        <div className="grid-item"><Chart
          chartType="PieChart"
          data={pieChartData}
          options={pieChartOptions}
          width={"100%"}
          height={"300px"}
        /></div>
        
        <div className="grid-item">

          <Chart chartType="ColumnChart" width="100%" height="100%" data={columnChartData} options={columnChartOptions} />
        </div>


        <div className="grid-item">
        <Chart
          chartType="BarChart"
          width="100%"
          height="100%"
          data={barChartData}
          options={barChartoptions}
        />
        </div>  
      </div>

      <div className="center">
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

      
    
        <button onClick={handleChange}>sad</button>


    </div>
  )
}

export default Home;
