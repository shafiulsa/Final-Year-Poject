import "./Home.css"
import AboutFacilities from "./Other/AboutFacilities";
import AboutSlider from "./Other/AboutSlider";
import Provost from "./Other/Provost";


const Home = () => {
    return (
        <>
            <div className="home">
            <div className="mainDiv max-w-7xl mx-auto align-middle" style={{ backgroundColor: "transparent" }}>
    <h1 className="text-white text-8xl font-bold text-center">Sheikh Russel Hall</h1>
    <p className="text-center text-2xl pt-5.5">
    Sheikh Russel Hall is one of the male residential halls at Mawlana Bhashani
        Science and Technology University (MBSTU), located in Santosh,
        Tangail, Bangladesh. The hall provides accommodation and essential
        facilities to male students, fostering a conducive environment for
        academic and personal growth.
    </p>
</div>

        </div>
        <AboutSlider></AboutSlider>
        <Provost ></Provost>
        <AboutFacilities></AboutFacilities>
        </>

    );
};

export default Home;