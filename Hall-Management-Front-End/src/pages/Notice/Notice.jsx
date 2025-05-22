

import React, { useEffect, useState } from "react";
import axios from "axios";

const MyNotice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await axios.get("https://final-year-poject.onrender.com/notices");
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
