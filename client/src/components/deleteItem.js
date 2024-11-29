import React from 'react'
import axios from 'axios';
const deleteItem = async (id) => {


    console.log(id);
        
    
    try {
        const token = localStorage.getItem("accessToken");
    
        // Data to send
        const data = {
          id: id
        };
        const response = await axios.delete(`expenses/deleteExpense`, {
            params: { id }, // Send id as a query parameter
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
    
          
        console.log(response.data)
        // Convert the response data to a map for easy lookup by task name
      
        console.log('sadsda');
        return response.data;
  
  
    } catch (err) {
        if (err.response && err.response.status === 401) {
            console.log("faile")
        } else { console.log("faile")
        }
    }


    console.log('sadsda');
  return (null)
}

export default deleteItem
