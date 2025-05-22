import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

// Base API URL
const API_BASE_URL = "https://final-year-poject.onrender.com";

// Reusable TableRow Component
const TableRow = ({ label, value }) => (
    <tr>
        <td className="px-4 py-2 font-semibold">{label}</td>
        <td className="px-4 py-2">{value}</td>
    </tr>
);

const SeatDetails = () => {
    const { roomNumber, seatId } = useParams(); // Get roomNumber and seat from URL parameters
    const [seatData, setSeatData] = useState(null);

    useEffect(() => {
        // Fetch seat data from backend when roomNumber and seatId change
        axios.get(`${API_BASE_URL}/room/${roomNumber}/${seatId}`)
            .then((response) => {
                setSeatData(response.data);  // Store the fetched data in the state
            })
            .catch((error) => console.error("Error fetching seat details:", error));
    }, [roomNumber, seatId]);  // Re-fetch data if roomNumber or seatId changes

    if (!seatData) {
        return <p>Loading seat details...</p>;  // Show loading state until data is fetched
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Seat Details</h1>

            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left">Attribute</th>
                        <th className="px-4 py-2 text-left">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Render table rows using the TableRow component */}
                    <TableRow label="Room Number" value={seatData.roomNumber} />
                    <TableRow label="Seat" value={seatData.seat} />
                    <TableRow label="Student Name" value={seatData.name || "Not Available"} />
                    <TableRow label="Student ID" value={seatData.studentId || "-"} />
                    <TableRow label="Department" value={seatData.department || "-"} />
                    <TableRow label="Father's Name" value={seatData.fatherName || "-"} />
                    <TableRow label="Mother's Name" value={seatData.motherName || "-"} />
                    <TableRow label="Father's Occupation" value={seatData.fatherOccupation || "-"} />
                    <TableRow label="Mother's Occupation" value={seatData.motherOccupation || "-"} />
                    <TableRow label="Annual Income" value={seatData.annualIncome || "-"} />
                    <TableRow
                        label="Signature"
                        value={<img src={`/signatures/${seatData.signature}`} alt="Signature" className="w-16 h-16" />}
                    />
                    <TableRow label="Time Remaining" value={seatData.timeRemaining} />
                </tbody>
            </table>

            <Link to={`/dashboard/update/${roomNumber}/${seatId}`}>
                <button className="bg-blue-500 text-white px-3 py-1 rounded mt-4">Update Info</button>
            </Link>

            <Link to="/" className="block text-blue-600 mt-4">Back to Home</Link>
        </div>
    );
};

export default SeatDetails;
