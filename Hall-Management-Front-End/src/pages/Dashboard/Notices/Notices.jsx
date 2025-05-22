

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const NoticeManagement = () => {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDate, setEditDate] = useState("");

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await axios.get("https://final-year-poject.onrender.com/notices");
      setNotices(res.data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNotice = { title, description, date };

    try {
      await axios.post("https://final-year-poject.onrender.com/notices", newNotice);
      setTitle("");
      setDescription("");
      setDate("");
      fetchNotices();
      alert("Notice created successfully!");
    } catch (error) {
      console.error("Error creating notice:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://final-year-poject.onrender.com/notices/${id}`);
      setNotices(notices.filter((notice) => notice._id !== id));
      alert("Notice deleted successfully!");
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  };

  const handleEdit = (notice) => {
    setEditingId(notice._id);
    setEditTitle(notice.title);
    setEditDescription(notice.description);
    setEditDate(notice.date);
    toast.success("Notice updated successfully!");
  };

  const handleSave = async (id) => {
    const updatedNotice = {
      title: editTitle,
      description: editDescription,
      date: editDate,
    };

    try {
      await axios.put(`https://final-year-poject.onrender.com/notices/${id}`, updatedNotice);
      fetchNotices();
      setEditingId(null);
      alert("Notice updated successfully!");
    } catch (error) {
      console.error("Error updating notice:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mt-10">
      {/* Create New Notice */}
      <div className="border rounded-lg shadow p-6 mb-10">
        <h2 className="text-2xl font-bold mb-4">Create New Notice</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Notice Title"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Notice Description"
            className="w-full p-2 border rounded"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Submit Notice
          </button>
        </form>
      </div>

      {/* Notice List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Notice Board</h2>
        {notices.length === 0 ? (
          <p className="text-gray-500">No notices available.</p>
        ) : (
          notices.map((notice) => (
            <div key={notice._id} className="border p-4 rounded mb-4 shadow">
              {editingId === notice._id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                    rows="3"
                  ></textarea>
                  <input
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                  />

                  <button
                    onClick={() => handleSave(notice._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold mb-2">{notice.title}</h3>
                  <p className="mb-2">{notice.description}</p>
                  <p className="text-sm text-gray-600 mb-4">{notice.date}</p>

                  <button
                    onClick={() => handleEdit(notice)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(notice._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NoticeManagement;
