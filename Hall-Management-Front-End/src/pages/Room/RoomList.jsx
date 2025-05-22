import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import SwapSeat from "../SwapSeat/SwapSeat";

const API_BASE_URL = "https://final-year-poject.onrender.com";

const RoomList = () => {
    const { floorNumber } = useParams();
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/floor/${floorNumber}`).then((res) => {
            setRooms(res.data);
        });
    }, [floorNumber]);

    return (
        <div className="mainDiv max-w-7xl mx-auto align-middle mt-10 mb-10">

            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Rooms on Floor {floorNumber}</h1>
                <div className="grid grid-cols-3 gap-4">
                    {rooms.map((room) => (
                        <Link
                            key={room.roomNumber}
                            to={`/dashboard/room/${room.roomNumber}`}
                            className="p-4 bg-fuchsia-800 text-white text-center rounded-lg cursor-pointer"
                        >
                            Room {room.roomNumber}
                        </Link>
                    ))}
                </div>
                <Link to="/dashboard/floorList" className="mt-4 block text-blue-600">Back to Floors</Link>
                {/* <SwapSeat></SwapSeat> */}
            </div>
        </div>
    );
};

export default RoomList;
