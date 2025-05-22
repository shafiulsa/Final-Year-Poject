
// import React from "react";

// const Notice = () => {
//   const notices = [
//     {
//       title: "Seat Vacancy",
//       description: "Limited seats are available in the hall for the upcoming semester. Interested students are requested to apply before the deadline.",
//       date: "13/06/25"
//     },
//     {
//       title: "Maintenance Schedule",
//       description: "The hall will undergo maintenance work from 15th June to 20th June. Residents are advised to cooperate and report any urgent issues before the maintenance starts.",
//       date: "10/06/25"
//     },
//     {
//       title: "New Meal Plan Registration",
//       description: "Registration for the new meal plan is now open. Students must complete the registration by 18th June to avail of the meal service without interruption.",
//       date: "08/06/25"
//     }
//   ];

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">

//       {/* <h2 className="text-xl a text-black font-semibold mb-2">Notices</h2> */}
//       <div className="space-y-4">
//         {notices.map((notice, index) => (
//           <div key={index} className="bg-white p-4 rounded-lg shadow">
//             <h3 className="text-lg text-red-500 font-bold">{notice.title}</h3>
//             <p className="text-gray-600 mb-2">{notice.description}</p>
//             <p className="text-sm text-gray-500">Date: {notice.date}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Notice;



import React, { useEffect, useState } from "react";
import axios from "axios";

const MyNotice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await axios.get("http://localhost:5000/notices");
        setNotices(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch notices");
        setLoading(false);
        console.error("Error fetching notices:", err);
      }
    };

    fetchNotices();
  }, []);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
        <p>Loading notices...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="space-y-4">
        {notices.length === 0 ? (
          <p className="text-gray-600">No notices available at the moment.</p>
        ) : (
          notices.map((notice) => (
            <div key={notice._id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg text-red-500 font-bold">{notice.title}</h3>
              <p className="text-gray-600 mb-2">{notice.description}</p>
              <p className="text-sm text-gray-500">
                Date: {new Date(notice.date).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyNotice;