"use client";

import {useState} from "react";
import Navbar from "@/components/navbar/navbar";
import Team from "@/components/team/team";
import Footer from "@/components/footer/footer";
import config from '@/config/website.json';

export default function TeamPage() {
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

            <Team data={config} />
            <Footer data={config} />
        </>
    )
}
