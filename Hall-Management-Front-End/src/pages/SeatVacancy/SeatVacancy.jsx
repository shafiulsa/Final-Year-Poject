import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE_URL = "https://final-year-poject.onrender.com";

const ExpiredOrInvalidSeats = () => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    // Fetch expired or invalid seats from the backend
    axios.get(`${API_BASE_URL}/expired`)
      .then((response) => {
        setSeats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching expired or invalid seats:", error);
      });
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Expired or Invalid Seats</h1>
      <table className="w-full  ">
        <thead>
          <tr >
            <th className="p-2 border border-gray-300">Room Number</th>
            <th className="p-2 border border-gray-300">Seat</th>
            <th className="p-2 border border-gray-300">Name</th>
            <th className="p-2 border border-gray-300">Student ID</th>
            <th className="p-2 border border-gray-300">Department</th>
            <th className="p-2 border border-gray-300">Expiry Date</th>
            <th className="p-2 border border-gray-300">Season</th>
          </tr>
        </thead>
        <tbody>
          {seats.map((seat) => (
            <tr key={seat._id} className="hover:bg-gradient-to-r from-purple-950 to-blue-500 transition-all duration-200">
              <td className="p-2 ">{seat.roomNumber}</td>
              <td className="p-2 ">{seat.seat}</td>
              <td className="p-2 ">{seat.name}</td>
              <td className="p-2 ">{seat.studentId}</td>
              <td className="p-2 ">{seat.department}</td>
              <td className="p-2 ">{seat.expiryDate || "N/A"}</td>
              <td className="p-2 ">{seat.season || "N/A"}</td>
              <td className="p-2 ">

              </td>
              <Link to={`/dashboard/update/${seat.roomNumber}/${seat.seat}`}>
                <div className="flex  mb-3 justify-center items-center">
                  <button className="bg-violet-600 p-2  text-black rounded mt-4 hover:bg-amber-700">
                    Update Info
                  </button>
                </div>
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpiredOrInvalidSeats;
