import { BedDouble, Utensils, Users, ShieldCheck } from "lucide-react";

const facilities = [
  {
    icon: <BedDouble size={40} className="text-blue-500" />,
    title: "Student Accommodation",
    description: "Provides residential facilities with necessary furniture, ensuring a comfortable stay for students.",
  },
  {
    icon: <Utensils size={40} className="text-green-500" />,
    title: "Dining & Cafeteria",
    description: "Offers meal services with hygienic food at affordable prices.",
  },
  {
    icon: <Users size={40} className="text-yellow-500" />,
    title: "Common Room & Recreation",
    description: "Equipped with a common room for relaxation, indoor games, and social interaction.",
  },
  {
    icon: <ShieldCheck size={40} className="text-red-500" />,
    title: "24/7 Security & Medical Support",
    description: "Ensures safety with security personnel and access to university medical facilities.",
  },
];

const AboutFacilities = () => {
  return (
    <div className="max-w-7xl mx-auto p-10">
      <h2 className="text-4xl font-bold text-center mb-8">Facilities at Sheikh Rasel Hall</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {facilities.map((facility, index) => (
          <div key={index} className="p-6 bg-white shadow-lg rounded-2xl flex flex-col items-center text-center">
            {facility.icon}
            <h3 className="text-xl text-purple-400 font-semibold mt-4">{facility.title}</h3>
            <p className="text-gray-600 mt-2">{facility.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default AboutFacilities;