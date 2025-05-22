

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { BarChart, PieChart, LineChart } from "@mui/x-charts";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Stack,
  Box,
  Divider,
} from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import PeopleIcon from "@mui/icons-material/People";
import BedIcon from "@mui/icons-material/Bed";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import SchoolIcon from "@mui/icons-material/School";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [notices, setNotices] = useState([]);
  const [alumniCount, setAlumniCount] = useState(0);
  const location = useLocation();
  const isDashboardHome =
    location.pathname === "/dashboard" || location.pathname === "/dashboard/";

  // Fetch dynamic data from backend APIs
  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          // Fetch user role from the Users collection
          const response = await axios.get(
            `https://final-year-poject.onrender.com/api/users/${user.email}`
          );
          setRole(response.data.role);
        } catch (error) {
          console.error("Error fetching role:", error);
        }
      }
    };

    const fetchDashboardData = async () => {
      try {
        // Fetch all seats (students) data
        const seatsResponse = await axios.get("https://final-year-poject.onrender.com/seats");
        const seats = seatsResponse.data;

        // Fetch all notices
        const noticesResponse = await axios.get(
          "https://final-year-poject.onrender.com/notices"
        );
        setNotices(noticesResponse.data);

        // Fetch alumni data
        const alumniResponse = await axios.get("https://final-year-poject.onrender.com/alumni");
        setAlumniCount(alumniResponse.data.length);

        // Fetch expired seats
        const expiredResponse = await axios.get(
          "https://final-year-poject.onrender.com/expired"
        );
        const expiredSeats = expiredResponse.data;

        // Calculate total students (booked seats)
        const totalStudents = seats.filter((seat) => seat.isBooked).length;

        // Calculate available seats (unbooked seats)
        const availableSeats = seats.filter((seat) => !seat.isBooked).length;

        // Calculate floor distribution
        const floorDistribution = Array(6).fill(0);
        seats.forEach((seat) => {
          if (seat.isBooked) {
            const floor = Math.floor(seat.roomNumber / 100) - 1;
            if (floor >= 0 && floor < 6) {
              floorDistribution[floor]++;
            }
          }
        });

        // Calculate department distribution
        const departmentCounts = {};
        seats.forEach((seat) => {
          if (seat.isBooked && seat.department) {
            departmentCounts[seat.department] =
              (departmentCounts[seat.department] || 0) + 1;
          }
        });
        const departmentDistribution = {
          labels: Object.keys(departmentCounts),
          data: Object.values(departmentCounts),
        };

        // Calculate monthly admissions (based on season)
        const monthlyAdmissions = Array(12).fill(0);
        const currentYear = new Date().getFullYear();
        seats.forEach((seat) => {
          if (seat.isBooked && seat.season) {
            const seasonYear = parseInt(seat.season.split("-")[0]);
            if (seasonYear === currentYear) {
              const month = Math.floor(Math.random() * 12); // Simulate month for demo
              monthlyAdmissions[month]++;
            }
          }
        });

        // Set dashboard data
        setDashboardData({
          totalStudents,
          availableSeats,
          upcomingEvents: noticesResponse.data.filter(
            (notice) => new Date(notice.date) >= new Date()
          ).length,
          recentNotices: noticesResponse.data.length,
          floorDistribution,
          departmentDistribution,
          monthlyAdmissions,
          expiredSeats: expiredSeats.length,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchUserRole();
    fetchDashboardData();
  }, [user]);

  // Loading state
  if (!role || !dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 transition-all duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col p-4 fixed h-full">
        <div className="flex items-center mb-8 p-2 bg-blue-50 rounded-lg">
          <h1 className="text-2xl font-bold text-blue-800">
            🏛️ Hall Management
          </h1>
        </div>
        <nav className="flex flex-col gap-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition-colors ${
                isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Dashboard
          </NavLink>

          {/* Conditional navigation based on role */}
          {role === "provost" && (
            <>
              <NavLink
                to="/dashboard/users"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors ${
                    isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                  }`
                }
              >
                <PeopleIcon className="mr-3" fontSize="small" />
                Users
              </NavLink>
              <NavLink
                to="/dashboard/form"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors ${
                    isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                  }`
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
                    clipRule="evenodd"
                  />
                </svg>
                Form
              </NavLink>
            </>
          )}

          {(role === "provost" ||
            role === "housetutor" ||
            role === "staff") && (
            <>
              <NavLink
                to="/dashboard/swap"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors ${
                    isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                  }`
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 7a3 3 0 100 6 3 3 0 000-6zM5 10a5 5 0 1110 0 5 5 0 01-10 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Swap Seat
              </NavLink>
              <NavLink
                to="/dashboard/room"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors ${
                    isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                  }`
                }
              >
                <BedIcon className="mr-3" fontSize="small" />
                Room
              </NavLink>
            </>
          )}

          {(role === "provost" ||
            role === "housetutor" ||
            role === "register") && (
            <>
              <NavLink
                to="/dashboard/notice"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors ${
                    isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                  }`
                }
              >
                <AnnouncementIcon className="mr-3" fontSize="small" />
                Notice
              </NavLink>
              <NavLink
                to="/dashboard/seat-vacancy"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors ${
                    isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                  }`
                }
              >
                <EventAvailableIcon className="mr-3" fontSize="small" />
                Seat Vacancy
              </NavLink>
            </>
          )}

          {/* {(role === "provost" || role === "register") && (
            <NavLink 
              to="/dashboard/alumni" 
              className={({isActive}) => 
                `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`
              }
            >
              <SchoolIcon className="mr-3" fontSize="small" />
              Alumni
            </NavLink>
          )} */}

          <hr className="my-2 border-gray-200" />
          <NavLink
            to="/"
            className="flex items-center p-3 rounded-lg transition-colors hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Home
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Navbar */}
        <header className="navbar bg-white shadow-sm">
          <div className="flex-1">
            <button className="btn btn-ghost md:hidden">☰</button>
            <span className="text-xl font-semibold text-gray-700 hidden md:block">
              {isDashboardHome
                ? "Dashboard Overview"
                : location.pathname
                    .split("/")
                    .pop()
                    .replace("-", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
            </span>
          </div>
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="avatar online">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL} alt="User" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Home Content */}
        {isDashboardHome ? (
          <main className="flex-1 p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome, {user?.displayName || "User"}!
              </h2>
              <p className="text-gray-600">
                Here's the latest overview of your hall management system.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              {/* Total Students Card */}
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <Typography variant="h6" className="opacity-75">
                        Total Seat
                      </Typography>
                      <Typography variant="h4">500</Typography>
                    </div>
                    <PeopleIcon fontSize="large" />
                  </div>
                </CardContent>
              </Card>

              {/* Available Seats Card */}
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <Typography variant="h6" className="opacity-75">
                        {" "}
                        Occupied Seat
                      </Typography>
                      <Typography variant="h4">
                        {dashboardData.availableSeats}
                      </Typography>
                    </div>
                    <BedIcon fontSize="large" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <Typography variant="h6" className="opacity-75">
                        Available Seat
                      </Typography>
                      <Typography variant="h4">
                        {500 - dashboardData.availableSeats}
                      </Typography>
                    </div>
                    <BedIcon fontSize="large" />
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Events Card */}
              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <Typography variant="h6" className="opacity-75">
                        Upcoming Events
                      </Typography>
                      <Typography variant="h4">
                        {dashboardData.upcomingEvents}
                      </Typography>
                    </div>
                    <EventAvailableIcon fontSize="large" />
                  </div>
                </CardContent>
              </Card>

              {/* Recent Notices Card */}
              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <Typography variant="h6" className="opacity-75">
                        Recent Notices
                      </Typography>
                      <Typography variant="h4">
                        {dashboardData.recentNotices}
                      </Typography>
                    </div>
                    <AnnouncementIcon fontSize="large" />
                  </div>
                </CardContent>
              </Card>

              {/* Alumni Count Card */}
              <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <Typography variant="h6" className="opacity-75">
                        Total Alumni
                      </Typography>
                      <Typography variant="h4">{alumniCount}</Typography>
                    </div>
                    <SchoolIcon fontSize="large" />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Seat Overview Pie Chart */}
              <Paper elevation={3} className="p-4">
                <Typography variant="h6" className="mb-4 text-gray-700">
                  Seat Occupancy Distribution
                </Typography>
                <PieChart
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: dashboardData.availableSeats,
                          label: "Available",
                          color: "#10b981", // Tailwind emerald-500
                        },
                        {
                          id: 1,
                          value: 500 - dashboardData.availableSeats,
                          label: "Occupied",
                          color: "#3b82f6", // Tailwind blue-500
                        },
                        {
                          id: 2,
                          value: dashboardData.expiredSeats || 0,
                          label: "Expired",
                          color: "#ef4444", // Tailwind red-500
                        },
                      ],
                      innerRadius: 30,
                      outerRadius: 100,
                      paddingAngle: 5,
                      cornerRadius: 5,
                    },
                  ]}
                  height={300}
                />
              </Paper>
            </div>
          </main>
        ) : (
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
