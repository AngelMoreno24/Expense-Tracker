import React, { useEffect, useState } from "react";
import "./Modal.css";
import axios from "axios";

export default function EditExpense({ item }) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  // Pre-fill state values with the `item` data passed in as a prop
  const [year, setYear] = useState(item?.year || "2024");
  const [month, setMonth] = useState(item?.month || "1");
  const [day, setDay] = useState(item?.day || "");
  const [error, setError] = useState('');
  const [description, setDescription] = useState(item?.description || "");
  const [category, setCategory] = useState(item?.category || "Food");
  const [amount, setAmount] = useState(item?.amount || "");

  const handleChangeYear = (event) => {
    setYear(event.target.value); // Get the selected value
    //console.log(event.target.value);
  };

  const handleChangeMonth = (event) => {
    setMonth(event.target.value); // Get the selected value
    //console.log(event.target.value);
  };
  const handleChangeCategoy = (event) => {
    setCategory(event.target.value); // Get the selected value
    //console.log(event.target.value);
  };
  const editExpense = async () => {
    
    try {
      const token = localStorage.getItem("accessToken");
  
      // Data to send
      const data = {
        "id": item._id,
        "amount": Number(amount),
        "description": description,
        "category": category,
        "year": year,
        "month": month,
        "day": day
      };

      console.log(data)

      // Use query parameters for GET
      const response = await axios.post("expenses/editExpense", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },

      });

      window.location.href = 'Home';
      setError("");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("An unexpected error occurred");
      }
      //
      //console.error("Error logging in:", err);
    }
  };

  useEffect(() => {
    if (month) {
      console.log(`Selected Month Value: ${month}`); // Perform any side effect
    }
  }, [month]); // Dependency array with `month`

  
  return (
    <>
      <button onClick={toggleModal} className="btn-modal2">
        Edit
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <p>amount:</p>
            <input 
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)} // Update the input state
              placeholder="..."
            />
            <p>description:</p>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)} // Update the input state
              placeholder="..."
            />
            <p>category:</p>
              <select name="category" id="category" className="date-Item" value={category} onChange={handleChangeCategoy}  >
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Others">Others</option>
              </select>
            <p>date:</p>
              <div className="input-div">
                      
                <select name="year" id="year" className="date-Item" value={year} onChange={handleChangeYear}  >
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                </select>

                <select name="month" id="month" className="date-Item" value={month} onChange={handleChangeMonth} >
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
                
                <input
                  type="text"
                  value={day}
                  onChange={(e) => setDay(e.target.value)} // Update the input state
                  placeholder="..."
                />
              </div>
              <p></p>
              <button className="submit-btn" onClick={editExpense}>
                Edit Expense
              </button>

            <button className="close-modal" onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
      )}
      <p>

      </p>
    </>
  );
}