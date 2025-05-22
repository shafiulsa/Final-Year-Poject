import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const API_BASE_URL = "https://final-year-poject.onrender.com";

const RoomDetails = () => {
  const { roomNumber } = useParams();
  const [seats, setSeats] = useState([]);

  // Convert month name to its index
  const monthToIndex = (monthName) => {
    const monthMap = {
      January: 0,
      February: 1,
      March: 2,
      April: 3,
      May: 4,
      June: 5,
      July: 6,
      August: 7,
      September: 8,
      October: 9,
      November: 10,
      December: 11,
    };
    return monthMap[monthName] || 0;
  };

  // Function to calculate remaining time
  const calculateRemainingTime = (expiryDate) => {
    const now = new Date();
    const timeDiff = expiryDate - now;

    if (timeDiff <= 0) {
      return "Expired";
    }

    // Calculate the remaining time in days
    const daysRemaining = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return `${daysRemaining} days remaining`;
  };

  // Function to calculate expiry date based on student data
  const getExpiryDate = (sessionYear, monthsToAdd, daysToAdd, yearsToAdd) => {
    const baseExpiryDate = new Date(sessionYear + 5, 3, 1); 
    
    const finalExpiryDate = new Date(baseExpiryDate);
    finalExpiryDate.setFullYear(finalExpiryDate.getFullYear() + yearsToAdd); 
    finalExpiryDate.setMonth(finalExpiryDate.getMonth() + monthsToAdd);
    finalExpiryDate.setDate(finalExpiryDate.getDate() + daysToAdd);

    return finalExpiryDate;
  };

  // Fetch data for the room
  const fetchSeatData = () => {
    axios
      .get(`${API_BASE_URL}/room/${roomNumber}`)
      .then((res) => {
        setSeats(Array.isArray(res.data) ? res.data : [res.data]);
      })
      .catch((err) => console.error("Error fetching seat data:", err));
  };
//   console.log(fetchSeatData())
  useEffect(() => {
    fetchSeatData();
    console.log(fetchSeatData())
    
    // Poll every 10 seconds (you can adjust this interval)
    const intervalId = setInterval(fetchSeatData, 10000); // 10 seconds

    return () => clearInterval(intervalId);
  }, [roomNumber]); 

 
  return (
    <div className="mainDiv max-w-7xl mx-auto align-middle mt-10 mb-10">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4"> Room No : {roomNumber}</h1>
        <div className="grid grid-cols-2 gap-4">
          {seats.map((seat, index) => {
            const sessionYear = parseInt(seat.season.split('-')[0]); 
            const monthsToAdd = monthToIndex(seat.months); // Convert month string to index
            const yearsToAdd = parseInt(seat.years); // Additional years
            const daysToAdd = parseInt(seat.days); // Additional days
            
            // Calculate the expiry date based on the student data
            const finalExpiryDate = getExpiryDate(sessionYear, monthsToAdd, daysToAdd, yearsToAdd);
            const timeRemaining = calculateRemainingTime(finalExpiryDate); // Calculate remaining time

            return (
              <div key={index} className="p-4 bg-indigo-300 text-black rounded-lg">
                <p><strong>Seat:</strong> {seat.seat}</p>
                <p><strong>Student:</strong> {seat.name || "Empty"}</p>
                <p><strong>Department:</strong> {seat.department || "-"}</p>
                <p><strong>Student ID:</strong> {seat.studentId || "-"}</p>
                <p><strong>Session:</strong> {seat.season || "-"}</p>

                {/* Display the remaining time for seat validity */}
                <p><strong>Valid Till :</strong> {seat.expiryDate}</p>

                {/* Links to update or see more details */}
                <Link to={`/dashboard/update/${seat.roomNumber}/${seat.seat}`}>
                  <button className="bg-blue-500 text-black px-3 py-1 rounded mr-2">
                    Update
                  </button>
                </Link>

                <Link to={`/dashboard/details/${seat.roomNumber}/${seat.seat}`}>
                  <button className="bg-green-500 text-white px-3 py-1 rounded">
                    More Details
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
        <Link to={`/floor/${Math.floor(roomNumber / 100)}`} className="mt-4 block text-blue-600">
          Back to Rooms
        </Link>
      </div>
    </div>
  );
};

export default RoomDetails;
