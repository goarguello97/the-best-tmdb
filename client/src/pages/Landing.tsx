import React from "react";
import movie from "../assets/videos/movieMashup.mp4"
const Landing = () => {
  return (
    <div className="landing">
      <video src={movie} autoPlay muted loop id="myVideo">
        
      </video>
        <div className='landing-box'>cosa2</div>
    </div>
  );
};

export default Landing;
