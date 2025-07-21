import React from "react";
import Hero from "./components/Hero";
import Footer from "../shared/Footer";
import Carouselimg from "./components/CarouselImg";



const Thumbnail = () => {
  return (
    <div>
      <Hero/>
      <Carouselimg/>
      <Footer/>
    </div>
  );
};

export default Thumbnail;
