"use client";
import React from 'react';
import Tickets from '@/components/tickets/tickets';
import Proposal from '@/components/proposal/proposal';



const Externals = ({data}) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 pb-6">
            {/* Box dei Tickets */}
            <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md">
                <Tickets data={data}/>
            </div>

            {/* Box della CallForPaper */}
            <div className="flex-1 bg-blue-100 p-6 rounded-lg shadow-md">
                <Proposal data={data}/>
            </div>
        </div>
    );
}

export default Externals;
