import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const API_BASE_URL = "http://localhost:5000";

const UpdateSeat = () => {
    const { roomNumber, seatId } = useParams(); // Get roomNumber and seatId from URL parameters
    const [seatData, setSeatData] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        name: "",
        studentId: "",
        season: "",
        department: "",
        fatherName: "",
        motherName: "",
        fatherOccupation: "",
        motherOccupation: "",
        annualIncome: "",
        signature: "",
        years: 0,
        extendData: 0, // Add extendData to the initial state
        months: "0",
        days: 0,
        level: "",
        expiryDate: "" // Add expiryDate to the initial state
    });
    const extendData = [0, ...Array.from({ length: 5 }, (_, i) => i + 1)];
    const months = ["0", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch seat data when roomNumber and seatId change
        axios.get(`${API_BASE_URL}/room/${roomNumber}/${seatId}`)
            .then((response) => {
                setSeatData(response.data);
                setUpdatedData(response.data); // Initialize form data with the current seat data
            })
            .catch((error) => console.error("Error fetching seat details:", error));
    }, [roomNumber, seatId]);

    const handleInputChange = (e) => {
        // Handle changes in the form fields
        const { name, value } = e.target;
        setUpdatedData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Calculate the expiry date
        const session = updatedData.season; 
        const sessionStartYear = parseInt(session.split('-')[0], 10); 
        const extendDataValue = parseInt(updatedData.extendData, 10) || 0; 
        const expiryYear = sessionStartYear + 5 + extendDataValue; 


        const expiryMonth = months.indexOf(updatedData.months); 
        const expiryDay = parseInt(updatedData.days, 10) || 1; 

        const expiryDate = `${expiryYear}-${String(expiryMonth).padStart(2, '0')}-${String(expiryDay).padStart(2, '0')}`;

        const dataToSend = {
            ...updatedData,
            expiryDate, 
        };

        // Send updated data to backend
        axios.put(`${API_BASE_URL}/room/${roomNumber}/${seatId}`, dataToSend)
            .then((response) => {
                // Show SweetAlert on success
                Swal.fire({
                    icon: 'success',
                    title: 'Updation Successful!',
                    text: 'Seat details have been updated successfully.',
                }).then(() => {
                    // Redirect after successful update
                    navigate(`/dashboard/details/${roomNumber}/${seatId}`);
                });
            })
            .catch((error) => {
                console.error("Error updating seat details:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed!',
                    text: 'Something went wrong while updating the seat details.',
                });
            });
    };

    const handleAddToAlumni = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to add this student to Alumni?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Add to Alumni",
            cancelButtonText: "No, Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`${API_BASE_URL}/alumni`, updatedData)
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            title: "Added to Alumni!",
                            text: "The student has been successfully added to the Alumni list.",
                        });

                        // Clear all fields except _id, roomNumber, and seat
                        setUpdatedData((prevState) => ({
                            _id: prevState._id,
                            roomNumber: prevState.roomNumber,
                            seat: prevState.seat,
                            name: "",
                            studentId: "",
                            season: "",
                            department: "",
                            fatherName: "",
                            motherName: "",
                            fatherOccupation: "",
                            motherOccupation: "",
                            annualIncome: "",
                            signature: "",
                            timeRemaining: "",
                        }));
                    })
                    .catch((error) => {
                        console.error("Error adding to alumni:", error);
                        Swal.fire({
                            icon: "error",
                            title: "Failed!",
                            text: "Something went wrong while adding to the Alumni.",
                        });
                    });
            }
        });
    };

    if (!seatData) {
        return <p>Loading seat details...</p>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Update Seat Details</h1>

            <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-2 gap-4">
                {/* Room Number (Uneditable) */}
                <div>
                    <label className="block font-semibold">Room Number</label>
                    <input
                        type="text"
                        name="roomNumber"
                        value={updatedData.roomNumber}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        disabled
                    />
                </div>

                {/* Seat (Uneditable) */}
                <div>
                    <label className="block font-semibold">Seat</label>
                    <input
                        type="text"
                        name="seat"
                        value={updatedData.seat}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        disabled
                    />
                </div>

                {/* Student Name */}
                <div>
                    <label className="block font-semibold">Student Name</label>
                    <input
                        type="text"
                        name="name"
                        value={updatedData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Student ID */}
                <div>
                    <label className="block font-semibold">Student ID</label>
                    <input
                        type="text"
                        name="studentId"
                        value={updatedData.studentId}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Session */}
                <div>
                    <label className="font-semibold">Session</label>
                    <input
                        type="text"
                        name="season"
                        value={updatedData.season}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Department */}
                <div>
                    <label className="block font-semibold">Department</label>
                    <input
                        type="text"
                        name="department"
                        value={updatedData.department}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Father's Name */}
                <div>
                    <label className="block font-semibold">Father's Name</label>
                    <input
                        type="text"
                        name="fatherName"
                        value={updatedData.fatherName}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Mother's Name */}
                <div>
                    <label className="block font-semibold">Mother's Name</label>
                    <input
                        type="text"
                        name="motherName"
                        value={updatedData.motherName}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Father's Occupation */}
                <div>
                    <label className="block font-semibold">Father's Occupation</label>
                    <input
                        type="text"
                        name="fatherOccupation"
                        value={updatedData.fatherOccupation}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Mother's Occupation */}
                <div>
                    <label className="block font-semibold">Mother's Occupation</label>
                    <input
                        type="text"
                        name="motherOccupation"
                        value={updatedData.motherOccupation}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Annual Income */}
                <div>
                    <label className="block font-semibold">Annual Income</label>
                    <input
                        type="text"
                        name="annualIncome"
                        value={updatedData.annualIncome}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Signature */}
                <div>
                    <label className="block font-semibold">Signature</label>
                    <input
                        type="text"
                        name="signature"
                        value={updatedData.signature}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Extend Data Selection */}
                <div>
                    <label className="block font-semibold">Extend Data</label>
                    <select
                        name="extendData"
                        value={updatedData.extendData}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    >
                        {extendData.map((date) => (
                            <option className="bg-gray-950 text-white" key={date} value={date}>
                                {date}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Month Selection */}
                <div>
                    <label className="block font-semibold">Month</label>
                    <select
                        name="months"
                        value={updatedData.months}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    >
                        {months.map((month, index) => (
                            <option className="bg-gray-950 text-white" key={index} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Day Selection */}
                <div>
                    <label className="block font-semibold">Day</label>
                    <select
                        name="days"
                        value={updatedData.days}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    >
                        {days.map((day) => (
                            <option className="bg-gray-950 text-white" key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Level Selection */}
                <div>
                    <label className="block font-semibold">Level</label>
                    <select
                        name="level"
                        value={updatedData.level}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    >
                        <option className="bg-gray-950 text-white" value="B.Sc">B.Sc</option>
                        <option className="bg-gray-950 text-white" value="M.Sc">M.Sc</option>
                    </select>
                </div>

                {/* Update Button */}
                <div className="col-span-2">
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Update Seat</button>
                </div>

                {/* Add to Alumni Button */}
                <div className="col-span-2">
                    <button type="button" onClick={handleAddToAlumni} className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Add to Alumni</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateSeat;