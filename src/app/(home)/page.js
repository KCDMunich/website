import Hero from "@/components/hero/hero";
import Navbar from "@/components/navbar/navbar";
import Info from "@/components/info/info";
import Externals from "@/components/externals/externals";
import Venue from "@/components/venue/venue";
import Hotel from "@/components/hotel/hotel";
import Sponsor from "@/components/sponsor/sponsor";
import Footer from "@/components/footer/footer";
import config from "@/config/website.json";

function convertToISOWithTimezone(dateString) {
    const date = new Date(dateString);
    const offsetMinutes = date.getTimezoneOffset();
    const offsetHours = Math.abs(offsetMinutes / 60);
    const sign = offsetMinutes > 0 ? "-" : "+";
    const formattedOffset = `${sign}${String(Math.floor(offsetHours)).padStart(2, "0")}:00`;

    return `${date.toISOString().split("Z")[0]}${formattedOffset}`;
}

export const generateMetadata = () => {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": `${config.general.event.name} - ${config.general.event.year}`,
        "startDate": "2025-06-24T09:00:00+02:00",
        "endDate": "2025-06-24T18:00:00+02:00",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "eventStatus": "https://schema.org/EventScheduled",
        "location": {
            "@type": `${config.venue.type}`,
            "name": `${config.venue.name}`,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": `${config.venue.street}`,
                "addressLocality": `${config.venue.city}`,
                "postalCode": `${config.venue.zip}`,
                "addressCountry": `${config.venue.countryCode}`
            }
        },
        "description": `${config.general.event.description}`,
        "image": `${config.general.event.logo}`,
        "organizer": {
            "@type": "Organization",
            "name": `${config.general.event.name}`,
            "url": `${config.general.event.website}`
        },
        "offers": config.tickets.type.map(ticket => ({
            "@type": "Offer",
            "name": ticket.name,
            "url": ticket.url,
            "price": `${ticket.price}.00`,
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "validFrom": convertToISOWithTimezone(ticket.salesStartDate)
        }))
    };

    return {
        title: "Cloud Native Days Italy 2025",
        description: "Cloud Native Days (CNS) Italy is a local, community-organized event that gathers adopters and technologists from open source and cloud native communities.",
        other: {
            "application/ld+json": JSON.stringify(schemaData)
        }
    };
};


export default function HomePage() {

    return (
        <>
            <Navbar data={config} additionalClassName="!bg-white" homepage="/" />
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
