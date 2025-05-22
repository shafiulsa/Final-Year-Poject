
import { Link } from "react-router-dom";

const FloorList = () => {
  const floors = [1, 2, 3, 4, 5,6];

  return (
    <div className="mainDiv max-w-7xl mx-auto align-middle mt-10 mb-10">

    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-4">Select a Floor</h1>
      <div className="grid grid-cols-2 gap-4">
        {floors.map((floor) => (
          <Link
            key={floor}
            to={`/dashboard/floor/${floor}`}
            className="p-4 bg-blue-500 text-white text-center rounded-lg cursor-pointer"
          >
            Floor {floor}
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
};

export default FloorList;
