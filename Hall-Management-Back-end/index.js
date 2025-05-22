
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a35pwem.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Utility function to normalize the expiryDate format
const normalizeExpiryDate = (expiryDate) => {
  if (!expiryDate) return null;

  // Replace multiple hyphens with a single hyphen
  expiryDate = expiryDate.replace(/-+/g, '-');

  // Split the date into parts
  const [year, month, day] = expiryDate.split('-');

  // Ensure month and day are two digits
  const normalizedMonth = month.padStart(2, '0');
  const normalizedDay = day.padStart(2, '0');

  // Return the normalized date in YYYY-MM-DD format
  return `${year}-${normalizedMonth}-${normalizedDay}`;
};
async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db("HallManagement");
    const studentsCollection = db.collection("Seats");
    const Alumni = db.collection("Alumni");
    const Users=db.collection("Users");
    // Add these imports at the top of your backend file
const noticesCollection = db.collection("Notices");

// API Routes for Notices

// Get all notices
const Notices = db.collection("Notices"); // Add this

// Create a new Notice
app.post("/notices", async (req, res) => {
  try {
    const notice = req.body;
    const result = await Notices.insertOne(notice);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding notice:", error);
    res.status(500).json({ message: "Failed to add notice" });
  }
});

// Get all Notices
app.get("/notices", async (req, res) => {
  try {
    const notices = await Notices.find({}).toArray();
    res.json(notices);
  } catch (error) {
    console.error("Error fetching notices:", error);
    res.status(500).json({ message: "Failed to fetch notices" });
  }
});

// Delete a Notice
app.delete("/notices/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Notices.deleteOne({ _id: new ObjectId(id) });
    res.json(result);
  } catch (error) {
    console.error("Error deleting notice:", error);
    res.status(500).json({ message: "Failed to delete notice" });
  }
});

// Update a Notice
app.put("/notices/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedNotice = req.body;
    const result = await Notices.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedNotice }
    );
    res.json(result);
  } catch (error) {
    console.error("Error updating notice:", error);
    res.status(500).json({ message: "Failed to update notice" });
  }
});








    // --- API Routes ---
    //users
    app.get('/users', async (req, res) => {
      try {
        const result = await Users.find().toArray();
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching users');
      }
    });
    // Node.js backend example
app.get("/api/users/:email", async (req, res) => {
  const email = req.params.email;
  const user = await Users.findOne({ email });
  
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ role: user.role });
});

    app.post('/users', async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await Users.findOne(query);
      
      if (existingUser) {
        return res.send({ message: 'User already exists' });
      }
      if (!user.role) {
        user.role = 'student'; 
      }
      
      const result = await Users.insertOne(user);
      res.send(result);
    });
    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      const result = await Users.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });
    





    app.get('/seats', async (req, res) => {
      try {
        const seats = await studentsCollection.find().toArray();
        res.json(seats);
      } catch (error) {
        res.status(500).json({ message: "Failed to retrieve data", error });
      }
    });
    app.patch('/users/:id', async (req, res) => {
      const id = req.params.id;
      const { role } = req.body;
      const result = await Users.updateOne(
        { _id: new ObjectId(id) },
        { $set: { role: role } }
      );
      res.send(result);
    });
    

    // Get rooms by floor
    app.get('/floor/:floorNumber', async (req, res) => {
      const floor = parseInt(req.params.floorNumber);
      if (floor < 1 || floor > 6) {
        return res.status(400).json({ message: "Invalid floor number" });
      }
      const rooms = [];
      for (let i = 1; i <= 26; i++) {
        rooms.push({ roomNumber: floor * 100 + i });
      }
      res.json(rooms);
    });

    // Get students in a room
    app.get('/room/:roomNumber', async (req, res) => {
      const roomNumber = parseInt(req.params.roomNumber);
      const students = await studentsCollection.find({ roomNumber }).toArray();
      res.json(students);
    });

    // Get student details by seat
    app.get('/student/:roomNumber/:seat', async (req, res) => {
      const { roomNumber, seat } = req.params;
      const student = await studentsCollection.findOne({ roomNumber: parseInt(roomNumber), seat });
      res.json(student || {});
    });
    // Update student details
    app.put("/update/:id", async (req, res) => {
      const { id } = req.params;
      console.log(id);
      const updatedData = req.body;
      const result = await studentsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
      );
      res.json(result);
    });
    const { ObjectId } = require('mongodb');



    // MongoDB connection URI and Database Setup



    // Define the GET route with roomNumber and seat as parameters
    app.get('/room/:roomNumber/:seat', async (req, res) => {
      try {
        const { roomNumber, seat } = req.params;
        console.log(roomNumber, seat)

        // Query MongoDB to find a document by roomNumber and seat
        const seatData = await studentsCollection.findOne({ roomNumber: parseInt(roomNumber), seat: seat });

        // Check if the seat data is found
        if (!seatData) {
          return res.status(404).json({ error: 'Seat not found' });
        }

        // Return the found seat data as JSON
        res.json(seatData);

      } catch (error) {
        console.error('Error fetching seat data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });





    app.put('/update-seat/:seatId', async (req, res) => {
      const { seatId } = req.params;
      const updatedData = req.body;
      const updateResult = await studentsCollection.updateOne(
        { _id: new ObjectId(seatId) },
        { $set: { student: updatedData, isBooked: true } }
      );
      res.json(updateResult);
    });


    app.put('/swap-seats', async (req, res) => {
      const { seat1Room, seat1Seat, seat2Room, seat2Seat } = req.body;
      const room1 = parseInt(seat1Room, 10);
      const room2 = parseInt(seat2Room, 10);

      console.log('Room 1:', room1);
      console.log('Seat 1:', seat1Seat);
      console.log('Room 2:', room2);
      console.log('Seat 2:', seat2Seat);

      try {
        // Fetch seat data for both seats
        const seat1 = await studentsCollection.findOne({ roomNumber: room1, seat: seat1Seat });
        const seat2 = await studentsCollection.findOne({ roomNumber: room2, seat: seat2Seat });

        console.log('Fetched Seat 1:', seat1);
        console.log('Fetched Seat 2:', seat2);

        if (!seat1 || !seat2) {
          return res.status(404).json({ success: false, message: 'One or both seats not found.' });
        }

       
        const updatedSeat1Data = {
          ...seat2,       
          roomNumber: seat1.roomNumber,  
          seat: seat1.seat,  
          _id: seat1._id, 
        };

        const updatedSeat2Data = {
          ...seat1,          
          roomNumber: seat2.roomNumber, 
          seat: seat2.seat,
          _id: seat2._id,    
        };

        // Log updated data to verify the changes
        console.log('Updated Seat 1:', updatedSeat1Data);
        console.log('Updated Seat 2:', updatedSeat2Data);

        // Perform the update in MongoDB
        const result1 = await studentsCollection.updateOne(
          { _id: seat1._id },
          { $set: updatedSeat1Data }
        );
        const result2 = await studentsCollection.updateOne(
          { _id: seat2._id },
          { $set: updatedSeat2Data }
        );

        if (result1.modifiedCount === 0 || result2.modifiedCount === 0) {
          return res.status(500).json({ success: false, message: 'Failed to update seats.' });
        }

        res.json({ success: true, message: 'Seats swapped successfully.' });
      } catch (error) {
        console.error('Error swapping seats:', error);
        res.status(500).json({ success: false, message: 'An error occurred while swapping seats.' });
      }
    });





    app.put('/room/:roomNumber/:seatId', async (req, res) => {
      const { roomNumber, seatId } = req.params;
      const updatedData = req.body;
      if (updatedData._id) {
        delete updatedData._id;
      }

      try {
        console.log(`Room: ${roomNumber}, Seat: ${seatId}`);
        console.log('Updated Data:', updatedData);

        // Use the correct collection (studentsCollection)
        const updatedSeat = await studentsCollection.findOneAndUpdate(
          { roomNumber: parseInt(roomNumber), seat: seatId }, 
          { $set: updatedData }, 
          { returnDocument: 'after' }  
        );

        // // Check if the seat was updated
        // if (!updatedSeat.value) {
        //   return res.status(404).json({ message: 'Seat not found' });
        // }

        // Send the updated seat back in the response
        res.json(updatedSeat.value);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
    });


    app.post("/alumni", async (req, res) => {
      try {
        const alumniData = req.body; // Get the incoming student data
        console.log(alumniData);

       
        const { _id, ...alumniDataWithoutId } = alumniData;

        
        const result = await Alumni.insertOne(alumniDataWithoutId); 
        const { roomNumber, seat } = alumniData;

        // Clear all fields except _id, roomNumber, and seat from the Students collection
        const updateResult = await studentsCollection.updateOne(
          { _id: alumniData._id },  // Find the student by _id
          {
            $set: {
              name: "",
              studentId: "",
              season: "",
              department: "",
              fatherName: "",
              motherName: "",
              fatherOccupation: "",
              motherOccupation: "",
              annualIncome: "",
              mobileNumber: "",
              signature: "",
              timeRemaining: ""
            },
            $unset: {
              yearOrSemester: "",  // Optionally unset fields
              relativeToTangail: ""
            }
          }
        );


        res.send({ message: "Student data successfully moved to alumni and cleared in students collection." });
      } catch (error) {
        console.error("Error adding to alumni:", error);
        res.status(500).json({ message: "Failed to add to alumni and clear data from Students collection" });
      }
    });

    // Backend - Express.js route to get all alumni data
    app.get("/alumni", async (req, res) => {
      try {
        // Fetch all alumni data from the Alumni collection
        const alumniData = await Alumni.find({}).toArray();

        // Send the fetched data back as a JSON response
        res.json(alumniData);
      } catch (error) {
        console.error("Error fetching alumni data:", error);
        res.status(500).json({ message: "Failed to fetch alumni data" });
      }
    });

    


app.get("/expired", async (req, res) => {
  try {
      // Get the current date
      const currentDate = new Date();

      // Fetch all seats from the database
      const seats = await studentsCollection.find().toArray();

      // Filter seats where expiryDate is in the past or season is null
      const expiredOrInvalidSeats = seats.filter((seat) => {
          if (!seat.season) return true; 

          if (!seat.expiryDate) return false; 
       
          const normalizedExpiryDate = normalizeExpiryDate(seat.expiryDate);
          const expiryDate = new Date(normalizedExpiryDate);
          return expiryDate <= currentDate;
      });

      // Send the filtered seats as the response
      res.json(expiredOrInvalidSeats);
  } catch (error) {
      console.error("Error fetching expired or invalid seats:", error);
      res.status(500).json({ message: "Failed to fetch expired or invalid seats", error: error.message });
  }
});


    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (error) {
    console.error(error);
  }
}

run().catch(console.dir);





