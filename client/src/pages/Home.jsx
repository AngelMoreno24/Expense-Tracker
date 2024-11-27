import React, {useState,useEffect} from 'react'
import { Chart } from "react-google-charts";
import axios from 'axios';
import "./Home.css"
import {pieChartOptions, columnChartOptions, barChartoptions, data} from "../chartOptions/chart"


const Home = () => {


  const [error, setError] = useState('');
  const [year, setYear] = useState("2024");
  const [month, setMonth] = useState("11");
  const [token, setToken] = useState(null);
  const [pieChartData, setPieChartData] = useState('');
  const [columnChartData, setColumnChartData] = useState('');
  const [barChartData, setBarChartData] = useState('');
  const [dataFound, setDataFound] = useState(false);

  useEffect(() => {
    
    const token = localStorage.getItem("accessToken");
    console.log(token);
    setToken(token);

    handleChange();
    getYear();
  },[]);

  const handleChange = async () => {
    
    try {
      const token = localStorage.getItem("accessToken");
  
      // Data to send
      const data = {
        account: "6744329ab290af96de65e837",
        year: year,
        month: month,
      };
  
      // Use query parameters for GET
      const response = await axios.post("expenses/getMonthlyExpenses", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      console.log("ada");
      console.log(response.data);

      //setPieChartData(response.data);
      let dataP = [
        ["Task", "Hours per Day"],
        ["Food", 0 ],
        ["Transportation", 0],
        ["Utilities", 0],
        ["Entertainment", 0],
        ["Others", 0]
      ];

      let dataC = [
        ["Element", "Density", { role: "style" }],
        ["Food", 0.00, "#003f5c"], // RGB value
        ["Transportation", 0.00, "#58508d"], // English color name
        ["Utilities", 0.00, "#bc5090"],
        ["Entertainment", 0.00, "color: #ff6361"], // CSS-style declaration
        ["Others", 0.00, "color: #ffa600"], // CSS-style declaration
      ];
        

      //fills in 0's for empty data 
      if(response.data.length === 0){
        console.log("empty")

        setPieChartData(dataP);
        setColumnChartData(dataC);
        setDataFound(false);
        return null;
      }
      setDataFound(true);
        

      // Convert the response data to a map for easy lookup by task name
      const responseMap = new Map(
        response.data.map(item => [item._id, item.totalAmount])
      );

      // Iterate through dataP starting from the second row (skip header)
      for (let i = 1; i < dataP.length; i++) {
        const taskName = dataP[i][0];  // Task name (first element of the row)

        // If the task exists in the response, update the value, otherwise set to 0
        dataP[i][1] = responseMap.has(taskName) ? responseMap.get(taskName) : 0;
      }

      setPieChartData(dataP);
      console.log(dataP);


      // Convert the response data to a map for easy lookup by task name
      const responseMapC = new Map(
        response.data.map(item => [item._id, item.totalAmount])
      );

      // Iterate through dataP starting from the second row (skip header)
      for (let i = 1; i < dataC.length; i++) {
        const taskName = dataC[i][0];  // Task name (first element of the row)

        // If the task exists in the response, update the value, otherwise set to 0
        dataC[i][1] = responseMapC.has(taskName) ? responseMapC.get(taskName) : 0;
      }

      setColumnChartData(dataC);
      console.log(dataC);

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


  const getYear = async () => {
    
    try {
      const token = localStorage.getItem("accessToken");
  
      // Data to send
      const data = {
        account: "6744329ab290af96de65e837",
        year: "2024"
      };
  
      // Use query parameters for GET
      const response = await axios.post("expenses/getYearExpenses", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      console.log("barbar");
      console.log(response.data);

          
      const barChartData = [
        ["Category", "Segment 1", { role: "style" }, "Segment 2", { role: "style" }, "Segment 3", { role: "style" }, "Segment 4", { role: "style" }, "Segment 5", { role: "style" }],
        ["Jan", 0, "003f5c", 0, "#58508d", 0, "#bc5090", 0, "#ff6361", 0, "#ffa600"],
        ["Feb", 0, "003f5c", 0, "#58508d", 0, "#bc5090", 0, "#ff6361", 0, "#ffa600"],
        ["Mar", 0, "003f5c", 0, "#58508d", 0, "#bc5090", 0, "#ff6361", 0, "#ffa600"],
        ["Apr", 0, "003f5c", 0, "#58508d", 0, "#bc5090", 0, "#ff6361", 0, "#ffa600"],
        ["June", 0, "003f5c", 0, "#58508d", 0, "#bc5090", 0, "#ff6361", 0, "#ffa600"],
        ["July", 0, "003f5c", 0, "#58508d", 0, "#bc5090", 0, "#ff6361", 0, "#ffa600"],
        ["Aug", 0, "003f5c", 0, "#58508d", 0, "#bc5090", 0, "#ff6361", 0, "#ffa600"],
        ["Sept", 0, "003f5c", 0, "#58508d", 0, "#bc5090", 0, "#ff6361", 0, "#ffa600"],
        ["Oct", 0, "003f5c", 0, "#58508d", 0, "#bc5090", 0, "#ff6361", 0, "#ffa600"],
        ["Nov", 0, "003f5c", 0, "#58508d", 0, "#bc5090", 0, "#ff6361", 0, "#ffa600"],
        ["Dec", 0, "003f5c", 0, "#58508d", 0, "#bc5090", 0, "#ff6361", 0, "#ffa600"],
      ];

      // Map categories to segment indexes
      const categoryMap = {
        Food: 1,           // Segment 1
        Transportation: 3, // Segment 2
        Utilities: 5,      // Segment 3
        Entertainment: 7,  // Segment 4
        Others: 9,         // Segment 5
      };

    
      //fills in 0's for empty data 
      if(response.data.length === 0){
        console.log("empty")

        setDataFound(false);
        return null;
      }

      setDataFound(true);
          

      // Map the months to names for the barChartData
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec",
    ];

    // Update barChartData based on the response data
    const updatedBarChartData = barChartData.map((row, index) => {
      if (index === 0) return row; // Skip the header row

      const monthName = row[0]; // First element in each row is the month name
      const monthIndex = monthNames.indexOf(monthName) + 1; // Convert month name to index (1–12)

      const monthData = response.data.find((data) => data.month === monthIndex.toString());
      if (monthData) {
        monthData.categories.forEach(({ category, totalAmount }) => {
          const segmentIndex = categoryMap[category];
          if (segmentIndex !== undefined) {
            row[segmentIndex] = totalAmount; // Update the value for the specific segment
          }
        });
      }

      return row;
    });


    console.log("Updated Bar Chart Data:", updatedBarChartData);

    // Save or update the bar chart data in your state
    setBarChartData(updatedBarChartData);


    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Error logging in:", err);
    }
  };


  const handleChangeYear = (event) => {
    setYear(event.target.value); // Get the selected value
    console.log(event.target.value);
  };

  const handleChangeMonth = (event) => {
    setMonth(event.target.value); // Get the selected value
    console.log(event.target.value);
  };

  useEffect(() => {
    handleChange();
  }, [month]); // Dependency array with `month`
  useEffect(() => {
    handleChange();
  }, [year]); // Dependency array with `month`


  return (
    <div>


      <div className="date-container">

        <div className="date-container2">
            

          <label htmlFor="year" className="date-Item">year</label>

          <select name="cars" id="cars" className="date-Item" value={year} onChange={handleChangeYear} >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>

        </div>

        <div className="date-container2">
          <label htmlFor="month" className="date-Item">month</label>

          <select name="cars" id="cars" className="date-Item" value={month} onChange={handleChangeMonth} >
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


      {dataFound?
        (<div className="grid-container">
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
        </div>)
          
        :
        (<p className="date-Item">No Data Found</p>
        )
      }
      

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

      
    


    </div>
  )
}

export default Home;
