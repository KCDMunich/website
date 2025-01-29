import '@/styles/globals.css';
import '@/components/hero/hero.css';
import '@/components/proposal/proposal.css';
import '@/components/info/info.css';
import '@/components/footer/footer.css';
import '@/components/navbar/navbar.css';
import '@/components/sponsor/sponsor.css';
import '@/components/tickets/tickets.css';

export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}
