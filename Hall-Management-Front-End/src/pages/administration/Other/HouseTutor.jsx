const HouseTutor = () => {
    return (
        <div className="p-10">
            {/* Title */}
            <h3 className="text-3xl font-bold text-center mb-8">House Tutor</h3>

            {/* Card Grid */}
            <div className="grid grid-cols-3 gap-10 justify-center">
                {/* House Tutor Cards */}
                {[
                    { name: "Dr. Md. Rasadujjaman", email: "abcd@gmail.com" },
                    { name: "Mr. Md. Al Amin", email: "abcd@gmail.com" },
                    { name: "Mr. Md. Anowar Kabir", email: "abcd@gmail.com" },
                    { name: "Dr. M. A. Kuddus", email: "abcd@gmail.com" },
                    { name: "Mr. Ashiqur Rahman", email: "abcd@gmail.com" },
                ].map((tutor, index) => (
                    <div key={index} className="card bg-base-100 w-96 shadow-sm p-5">
                        <figure>
                            <img src="../../../public/man.png" alt="tutor-pic" />
                        </figure>
                        <div className="card-body ">
                            <h2 className="card-title">{tutor.name}</h2>
                            <h3>House Tutor</h3>
                            <small><i>Email: {tutor.email}</i></small>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HouseTutor;
