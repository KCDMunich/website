"use client";

import {useState} from "react";
import Hero from "@/components/hero/hero";
import Navbar from "@/components/navbar/navbar";
import Info from "@/components/info/info";
import Externals from "@/components/externals/externals";
import Venue from "@/components/venue/venue";
import Hotel from "@/components/hotel/hotel";
import Sponsor from "@/components/sponsor/sponsor";
import Footer from "@/components/footer/footer";
import config from "@/config/website.json";

export default function HomePage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const handleHeaderBurgerClick = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <>
            <Navbar
                    data={config}
                    isMobileMenuOpen={isMobileMenuOpen}
                    additionalClassName="!bg-white"
                    homepage="/"
                    onBurgerClick={handleHeaderBurgerClick}
                />
            <Hero data={config} />
            <Info data={config} />
            <Externals data={config} />
            <Venue data={config} />
            <Hotel data={config} />
            <Sponsor data={config} />
            <Footer data={config} />
        </>
    )
}
