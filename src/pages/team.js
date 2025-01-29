import fs from 'fs';
import path from 'path';
import {useState} from "react";
import Navbar from "@/components/navbar/navbar";
import Team from "@/components/team/team";
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

            <Team data={data} />

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
