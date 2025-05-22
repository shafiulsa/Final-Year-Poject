

import { MapPin, Mail, Phone } from "lucide-react";
import SharedContact from "./SharedContact";
import StaffList from "./StaffList";

const Contact = () =>  {
  return (
  <div className="mainDiv max-w-7xl mx-auto align-middle mt-10 mb-10">
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left - Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white shadow-lg rounded-lg text-center">
          <MapPin size={40} className="mx-auto text-blue-500" />
          <h3 className="text-lg  text-blue-500 font-semibold mt-3">Our Address</h3>
          <p className="text-gray-600">MBSTU ,Santosh, Tangail, Bangladeshh</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg text-center">
          <Mail size={40} className="mx-auto text-blue-500" />
          <h3 className="text-lg  text-blue-500 font-semibold mt-3">Email Us</h3>
          <p className="text-gray-600">mail@shekhraselhall.mbstu.ac.bd</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg text-center md:col-span-2">
          <Phone size={40} className="mx-auto text-blue-500" />
          <h3 className="text-lg  text-blue-500 font-semibold mt-3">Call Us</h3>
          <p className="text-gray-600">+880-2-55167100 (7718)</p>
        </div>
      </div>

      {/* Right - Contact Form */}
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
            
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border  text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            className="w-full p-3 border  text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Message"
            className="w-full p-3 h-32 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Send Message
          </button>
        </form>
      </div>
    </div>
    <StaffList></StaffList>
    <SharedContact></SharedContact>

  </div>

  );
}
export default Contact;