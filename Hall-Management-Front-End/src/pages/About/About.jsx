import SharedContact from "../Contact/SharedContact";
import Provost from "../Home/Other/Provost";


const About = () => {
    return (
        <div>
            <div className="mainDiv max-w-7xl mx-auto align-middle mt-10 mb-10">
                <h1 className="text-center text-5xl font-bold mt-10 mb-10">About Sheikh Russel Hall</h1>
                <div className="grid grid-cols-4 gap-6 items-center">
                    <img src="https://mbstu.ac.bd/wp-content/uploads/2024/11/Visit-MBSTU-5-1024x682.jpeg" alt="Bijoy-24" className="w-full h-auto col-span-1 rounded-lg" />
                    <p className="col-span-3 text-justify">
                    Sheikh Russel Hall is one of the prominent male residential facilities at Mawlana Bhashani Science and Technology University (MBSTU), located in Tangail, Bangladesh. Named in honor of Sheikh Russel, the youngest son of Bangladesh's founding leader, Bangabandhu Sheikh Mujibur Rahman, the hall reflects the nation's respect for its historical figures. The university offers several residential halls to accommodate its students, including Sheikh Russel Hall, which provides essential amenities to ensure a comfortable living environment conducive to academic pursuits                        <br /><br />
 <br />
 The administration of Sheikh Russel Hall is overseen by a Provost, supported by assistant provosts and other staff members, ensuring the smooth operation of the facility and addressing the needs of its residents. The hall's governance is integral to maintaining discipline, organizing events, and fostering a community spirit among the students. In August 2023, the then-Provost of Sheikh Russel Hall, Professor Dr. Md. Idris Ali, along with other university officials, resigned amid student protests demanding administrative changes. This incident highlighted the dynamic relationship between the university administration and its student body, emphasizing the importance of responsive and transparent governance within the institution.
                     </p>
                </div>

                <div className="mt-10 mb-10">
                    <p> 
                    Sheikh Russel Hall is more than just a residential space; it serves as a hub for cultural, social, and extracurricular activities, enriching the university experience for its residents. The hall provides a platform for students to engage in various events, fostering personal development and camaraderie. By offering a supportive environment, Sheikh Russel Hall contributes significantly to the holistic development of MBSTU students, preparing them for future professional and personal endeavors.</p> 
                    </div>

                <Provost></Provost>
                <SharedContact></SharedContact>
            </div>

        </div>
    );
};

export default About;
