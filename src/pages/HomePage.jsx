/** @format */

import Navbar from "../components/Navbar";
// import UpLoadSection from "../components/upLoadSection";
import Footer from "../components/Footer";
import HomeCard from "../components/HomeCard";
import Hero from "../components/Hero";
import UpLoadSection from "../components/UpLoadSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <UpLoadSection/>
      {/* <HomeCard /> */}
      <Footer />
    </>
  );
}
