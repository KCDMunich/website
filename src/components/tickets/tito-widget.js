
import { useEffect } from "react";

export default function TitoWidget({event}) {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://js.tito.io/v2";
        script.async = true;
        document.head.appendChild(script);
    }, []);

    return (
        <>
            <tito-widget event={event}></tito-widget>
        </>
    );
}
