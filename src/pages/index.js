import React from "react";
import imageUrl from '../../public/assets/images/landing-page.svg';
import Navbar from "@/components/NavBar";
import LandingPage from "@/components/LandingPage";
const Home = () => {
    return (
        <>
        <Navbar />
            <LandingPage />
        </>
    );
};

export default Home;