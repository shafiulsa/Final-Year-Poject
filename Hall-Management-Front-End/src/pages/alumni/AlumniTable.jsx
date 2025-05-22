

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AlumniTable = () => {
    const [alumni, setAlumni] = useState([]);

    // Fetch alumni data when the component mounts
    useEffect(() => {
        axios.get('http://localhost:5000/alumni')
            .then((response) => {
                setAlumni(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching alumni data!', error);
            });
    }, []);

    return (
        <div className="overflow-x-auto  max-w-7xl mx-auto align-middle mt-10 mb-10" >
            <table className="table-auto w-full border-collapse">
                <thead>
                    <tr >
                        <th className="border p-2">Room Number</th>
                        <th className="border p-2">Seat</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Student ID</th>
                        <th className="border p-2">Department</th>
                        <th className="border p-2">Session</th>

                    </tr>
                </thead>
                <tbody>
                    {alumni.map((student) => (
                        <tr key={student._id}>
                            <td className="border p-2">{student.roomNumber}</td>
                            <td className="border p-2">{student.seat}</td>
                            <td className="border p-2">{student.name}</td>
                            <td className="border p-2">{student.studentId}</td>
                            <td className="border p-2">{student.department}</td>
                            <td className="border p-2">{student.season}</td>
                        
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AlumniTable;
