import fs from 'fs';
import path from 'path';
import {useState} from "react";
import Hero from "@/components/hero/hero";
import Navbar from "@/components/navbar/navbar";
import Info from "@/components/info/info";
import Externals from "@/components/externals/externals";
import Venue from "@/components/venue/venue";
import Hotel from "@/components/hotel/hotel";
import Sponsor from "@/components/sponsor/sponsor";
import Footer from "@/components/footer/footer";

export default function Home({ data }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const handleHeaderBurgerClick = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <>
            <Navbar
                data={data}
                isMobileMenuOpen={isMobileMenuOpen}
                additionalClassName="!bg-white"
                homepage="/"
                onBurgerClick={handleHeaderBurgerClick}
            />
            <Hero data={data} />
            <Info data={data} />
            <Externals data={data} />
            <Venue data={data} />
            <Hotel data={data} />
            <Sponsor data={data} />
            <Footer data={data} />
        </>
    )
}

export async function getStaticProps() {
    const filePath = path.join(process.cwd(), 'src/config/website.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
    return {
        props: {
            data,
        },
    };
}
