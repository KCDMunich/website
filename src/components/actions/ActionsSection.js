import C4P_Card from './C4P_Card';
import TicketsCard from './TicketsCard';

export default function ActionsSection({ data }) {
    if (!data) return null;

    return (
        <section className="bg-white py-20 lg:py-24" id={"tickets"}>
            <div className="container mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    <C4P_Card data={data.c4p} />
                    <TicketsCard data={data.tickets} />
                </div>
            </div>
        </section>
    );
}
