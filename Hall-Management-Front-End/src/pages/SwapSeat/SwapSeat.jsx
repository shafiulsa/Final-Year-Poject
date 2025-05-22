



import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const SeatSwap = () => {
  const [seat1Room, setSeat1Room] = useState('');
  const [seat1Seat, setSeat1Seat] = useState('');
  const [seat2Room, setSeat2Room] = useState('');
  const [seat2Seat, setSeat2Seat] = useState('');

  const handleSwap = async () => {
    // Confirmation before proceeding with the swap
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will swap all data between the two seats!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, swap it!',
      cancelButtonText: 'No, cancel',
    });

    if (result.isConfirmed) {
      try {
        // Show progress message
        Swal.fire({
          title: 'Swapping seats...',
          text: 'Please wait while we update the data.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        // Make an API call to the backend to swap the data
        const response = await axios.put('http://localhost:5000/swap-seats', {
          seat1Room,
          seat1Seat,
          seat2Room,
          seat2Seat,
        });

        // If the swap was successful
        if (response.data.success) {
          Swal.fire('Success!', 'Seats have been swapped successfully.', 'success');
        } else {
          Swal.fire('Error!', 'There was an issue swapping the seats. Please try again.', 'error');
        }
      } catch (error) {
        Swal.fire('Error!', 'There was an error connecting to the server. Please try again later.', 'error');
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h2 className="text-2xl font-bold mb-4">Swap Seat Data</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Seat 1 Room Number"
          value={seat1Room}
          onChange={(e) => setSeat1Room(e.target.value)}
          className="input input-bordered mb-2"
        />
        <input
          type="text"
          placeholder="Seat 1 Seat Number"
          value={seat1Seat}
          onChange={(e) => setSeat1Seat(e.target.value)}
          className="input input-bordered mb-2"
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Seat 2 Room Number"
          value={seat2Room}
          onChange={(e) => setSeat2Room(e.target.value)}
          className="input input-bordered mb-2"
        />
        <input
          type="text"
          placeholder="Seat 2 Seat Number"
          value={seat2Seat}
          onChange={(e) => setSeat2Seat(e.target.value)}
          className="input input-bordered mb-2"
        />
      </div>

      <button className="btn btn-primary" onClick={handleSwap}>Swap Seats</button>
    </div>
  );
};

export default SeatSwap;
