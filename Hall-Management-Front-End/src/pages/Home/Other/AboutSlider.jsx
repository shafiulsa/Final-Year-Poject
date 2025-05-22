
import { useState, useEffect } from "react";

const images = [
  "/slid1.jpeg",
  "/slid2.jpg",
  "/slid 3.jpeg",
  "/slid 4.jpeg",
];

const AboutSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return; // Stop auto-slide on hover

    const interval = setInterval(() => {
      nextSlide();
    }, 2500); // Slide change every 4s

    return () => clearInterval(interval);
  }, [isHovered, currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div 
      className="max-w-7xl mx-auto overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-center items-center p-10">
        <h1 className="text-5xl">Photo Gallery</h1>
      </div>
      
      {/* Slider Container */}
      <div className="relative w-full h-[600px] overflow-hidden">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <img 
              key={index}
              src={img}
              className="w-full h-[600px] object-cover flex-shrink-0"
              alt={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <button onClick={prevSlide} className="btn btn-circle">❮</button>
          <button onClick={nextSlide} className="btn btn-circle">❯</button>
        </div>
      </div>
    </div>
  );
};

export default AboutSlider;
