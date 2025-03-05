"use client";
import React, {useState, useEffect} from 'react';
import {CalendarDays, Info, Clock, ChevronRight} from 'lucide-react';
import "@/components/proposal/proposal.css";

const PLAYLIST_ID = 'PL54A_DPe8WtBuSp7sqpxeuy_UoTTlKB1O';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
        day: '2-digit',
        month: 'long', // Usa il nome completo del mese
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };

    return date.toLocaleString('en-US', options).replace(',', '').replace(/\b(am|pm)\b/, (match) => match.toUpperCase());
};


const Proposal = ({data}) => {
    const openDate = new Date(data.proposal.startDate);
    const closeDate = new Date(data.proposal.endDate);



    const textualOpenDate = formatDate(data.proposal.startDate);
    const textualCloseDate = formatDate(data.proposal.endDate);

    const now = new Date();
    const total = closeDate.getTime() - openDate.getTime();
    const progress = Math.max(0, Math.min(100, Math.ceil(((now.getTime() - openDate.getTime()) / total) * 100)));

    console.log(progress);
    return (
        <div className="mx-auto max-w-7xl p-4" id="proposal">
            <div className="mx-auto max-w-7xl space-y-8">
                <h3 className="font-semibold">{data.proposal.title}</h3>
                {/* Timeline Card */}
                <div className="rounded-lg border bg-white shadow-sm">
                    <div className="border-b p-6">
                        <h2 className="flex items-center gap-2 text-lg font-semibold">
                            <CalendarDays className="h-5 w-5 text-primary-1"/>
                            {data.proposal.timeline}
                        </h2>
                    </div>
                    <div className="space-y-6 p-6">
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <div>
                                    <div className="text-gray-500">Opens</div>
                                    <div className="font-medium">{textualOpenDate}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-gray-500">Closes</div>
                                    <div className="font-medium">{textualCloseDate}</div>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-2 w-full rounded-full bg-gray-200">
                                <div className="h-2 rounded-full bg-blue-500" style={{width: `${progress}%`}}/>
                            </div>

                            <div className="flex items-center text-xs text-gray-500">
                                <Clock className="mr-1 h-3 w-3"/>
                                W. Europe Daylight Time (UTC+02:00)
                            </div>


                        </div>

                    </div>

                </div>
                <div className="flex flex-col items-stretch gap-4 px-6 pb-6">
                    <p className="text-center text-sm text-gray-500">
                        {data.proposal.CTA}
                    </p>
                    <div className="flex flex-col items-center">
                        <button
                            type="button"
                            className="button"
                            style={{cursor: 'pointer'}}
                            onClick={() =>
                                window.open(data.proposal.url, '_blank')
                            }
                        >
                            Submit a session
                        </button>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Proposal;
