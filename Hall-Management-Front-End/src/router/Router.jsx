// import { createBrowserRouter } from "react-router-dom";
// import Main from "../Layout/Main";
// import Home from "../pages/Home/Home";
// import About from "../pages/About/About";
// import Contact from "../pages/Contact/Contact";
// import Administration from "../pages/administration/Administration";
// import Alumni from "../pages/alumni/AlumniTable";

// import SeatVacancy from "../pages/SeatVacancy/SeatVacancy";
// import Notice from "../pages/Notice/Notice";
// import FloorList from "../pages/Room/FloorList";
// import RoomList from "../pages/Room/RoomList";
// import RoomDetails from "../pages/Room/RoomDetails";
// import SeatDetails from "../pages/Room/SeatDetails";
// import UpdateSeat from "../pages/Room/UpdateSeat";
// import SeatSwap from "../pages/SwapSeat/SwapSeat";
// import Login from "../pages/Login/Login";
// import Register from "../pages/Register/Register";
// import PrivetRouter from "../PrivetRouter/PrivetRouter";
// import Dashboard from "../Layout/Dashboard";
// import ManageUsers from "../pages/Dashboard/Users/ManageUsers";
// import Notices from "../pages/Dashboard/Notices/Notices";
// import FormBuilder from "../pages/Dashboard/FormBuilder/FormBuilder";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Main></Main>,
//     children: [
//       {
//         path: "/",
//         element: <Home></Home>,
//       },
//       {
//         path: "/about",
//         element: <About></About>,
//       },
//       {
//         path: "/administration",
//         element: <Administration></Administration>,
//       },
//       {
//         path: "/alumni",
//         element: <Alumni></Alumni>,
//       },
//       // {
//       //   path: "/floorList",
//       //   element: <FloorList></FloorList>,
//       // },
//       {
//         path: "/floor/:floorNumber",
//         element: <RoomList></RoomList>,
//       },


//       {
//         path: "/notice",
//         element: <Notice></Notice>,
//       },
//       {
//         path: "/seat-vacancy",
//         element: (
//           <PrivetRouter>
//             <SeatVacancy></SeatVacancy>
//           </PrivetRouter>
//         ),
//       },
//       {
//         path: "/contact",
//         element: <Contact></Contact>,
//       },
//       {
//         path: "/details/:roomNumber/:seatId",
//         element: <SeatDetails></SeatDetails>,
//       },
//       {
//         path: "/update/:roomNumber/:seatId",
//         element: <UpdateSeat></UpdateSeat>,
//       },
//       {
//         path: "/swap",
//         element: <SeatSwap></SeatSwap>,
//       },
//       {
//         path: "/login",
//         element: <Login></Login>,
//       },
//       {
//         path: "/register",
//         element: <Register></Register>,
//       },
//     ],
//   },
//   {
//     path: "/dashboard",
//     element: (
//       <PrivetRouter>
//         <Dashboard></Dashboard>
//       </PrivetRouter>
//     ),

//     children: [
//       {
//         path: "swap", // Correctly defined as relative
//         element: <SeatSwap></SeatSwap>,
//       },
//       {
//         path: "users",
//         element: <ManageUsers></ManageUsers>,
//       },
//       {
//         path: "notice",
//         element: <Notices></Notices>,
//       },
//       {
//         path: "seat-vacancy",
//         element: <SeatVacancy></SeatVacancy>,
//       },
//       {
//         path: "room",
//         element: <FloorList></FloorList>,
//       },
      
//       {
//         path: "details/:roomNumber/:seatId",
//         element: <SeatDetails></SeatDetails>,
//       },
//       {
//         path: "update/:roomNumber/:seatId",
//         element: <UpdateSeat></UpdateSeat>,
//       },
//       {
//         path: "form",
//         element: <FormBuilder></FormBuilder>,
//       },
//       {
//         path: "floor/:floorNumber",
//         element: <RoomList></RoomList>,
//       },
//       {
//         path: "/floorList",
//         element: <FloorList></FloorList>,
//       },
//     ],
//   },
// ]);

// export default router;

import { createBrowserRouter } from "react-router-dom";

// Layouts
import Main from "../Layout/Main";
import Dashboard from "../Layout/Dashboard";

// Public Pages
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Administration from "../pages/administration/Administration";
import Alumni from "../pages/alumni/AlumniTable";
import Notice from "../pages/Notice/Notice";
import SeatVacancy from "../pages/SeatVacancy/SeatVacancy";
import FloorList from "../pages/Room/FloorList";
import RoomList from "../pages/Room/RoomList";
import RoomDetails from "../pages/Room/RoomDetails";
import SeatDetails from "../pages/Room/SeatDetails";
import UpdateSeat from "../pages/Room/UpdateSeat";
import SeatSwap from "../pages/SwapSeat/SwapSeat";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

// Protected Route Wrapper
import PrivetRouter from "../PrivetRouter/PrivetRouter";

// Dashboard Pages
import ManageUsers from "../pages/Dashboard/Users/ManageUsers";
import Notices from "../pages/Dashboard/Notices/Notices";
import FormBuilder from "../pages/Dashboard/FormBuilder/FormBuilder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/administration", element: <Administration /> },
      { path: "/alumni", element: <Alumni /> },
      { path: "/notice", element: <Notice /> },
      { path: "/seat-vacancy", element: <PrivetRouter><SeatVacancy /></PrivetRouter> },
      { path: "/contact", element: <Contact /> },
      { path: "/details/:roomNumber/:seatId", element: <SeatDetails /> },
      { path: "/update/:roomNumber/:seatId", element: <UpdateSeat /> },
      { path: "/swap", element: <SeatSwap /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/floor/:floorNumber", element: <RoomList /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRouter>
        <Dashboard />
      </PrivetRouter>
    ),
    children: [
      { path: "swap", element: <SeatSwap /> },
      { path: "users", element: <ManageUsers /> },
      { path: "notice", element: <Notices /> },
      { path: "seat-vacancy", element: <SeatVacancy /> },
      { path: "room", element: <FloorList /> },
       { path: "room/:roomNumber", element: <RoomDetails /> },
     { path: "details/:roomNumber/:seatId", element: <SeatDetails /> },
      { path: "update/:roomNumber/:seatId", element: <UpdateSeat /> },
      { path: "form", element: <FormBuilder /> },
      { path: "floor/:floorNumber", element: <RoomList /> },
      { path: "floorList", element: <FloorList /> }, // Now relative, correctly nested
    ],
  },
]);

export default router;

