import React, { useEffect, useState } from 'react';
import scheduleJSON from './schedule.json'; //Daten aus der schedule.json
import './schedule.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

// const scriptUrl = 'https://sessionize.com/api/v2/t71l7ld5/view/GridSmart';
// const scriptUrl = 'https://sessionize.com/api/v2/6dqtqpt2/view/Sessions'; api -> sessionList

const Schedule = () => {
  return (
    <section className="safe-paddings relative bg-white pb-40 lg:pb-32 md:py-24 sm:py-16">
      <div className="container flex justify-between lg:flex-col">
        <div className="text-primary-1 lg:flex lg:flex-col lg:items-center lg:justify-center lg:text-center">
          <br />
          <SessionListComponent />
        </div>
      </div>
    </section>
  );
};

const SessionListComponent = () => {
  const [sessionData, setSessionData] = useState([]);

  // useEffect(() => {
  //   fetch(scriptUrl)
  //     .then((response) => response.json())
  //     .then((data) => setSessionData(data))
  //     .catch((error) => console.error('Error:', error));
  // }, []);

  useEffect(() => {
    // aus der speaker.json
    setSessionData(scheduleJSON);
  }, []);

  return (
    <div style={{ border: 'solid red' }}>
      <FullCalendar
        allDaySlot="false"
        plugins={[timeGridPlugin]}
        initialView="timeGrid"
        slotLabelInterval={{ hours: 1 }} // Definiert die Intervalle in Stunden
        slotMinTime="08:00:00" // Startzeit des Kalenders
        slotMaxTime="24:00:00" // Endzeit des Kalenders
        height="auto" // Passt die Höhe automatisch an
        headerToolbar={{
          left: '',
          center: 'title',
          right: '',
        }}
        visibleRange={{
          start: '2024-03-08', // Startdatum
          end: '2024-03-10', // Enddatum (exklusiv, also +1 Tag zum gewünschten Enddatum)
        }}
        // Weitere Optionen und Event-Handler nach Bedarf
      />
    </div>
  );

  // return (
  //   <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2">
  //     HALLO
  //     {sessionData.map((dateData) => (
  //       <div key={dateData.date}>
  //         <h2 className="mt-4 text-2xl font-semibold">{dateData.date}</h2>
  //         {dateData.rooms.map((room) => (
  //           <div key={room.id}>
  //             <h3 className="mt-2 text-xl font-semibold">{room.name}</h3>
  //             {room.sessions.map((session) => (
  //               <div key={session.id} className="bg-gray-100 mt-2 rounded-lg p-4 shadow-md">
  //                 <h4 className="text-lg font-semibold">{session.title}</h4>
  //                 <p className="text-gray-500">{session.description}</p>
  //                 <p className="mt-2">Speaker: {session.speakers[0]?.name}</p>
  //                 <p>Starts At: {session.startsAt}</p>
  //                 <p>Ends At: {session.endsAt}</p>
  //                 <p>Status: {session.status}</p>
  //               </div>
  //             ))}
  //           </div>
  //         ))}
  //       </div>
  //     ))}
  //   </div>
  // );
};

export default Schedule;
