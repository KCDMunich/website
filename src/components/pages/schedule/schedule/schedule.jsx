import React, { useEffect, useState } from 'react';
import scheduleJSON from './schedule.json'; //Daten aus der schedule.json
import './schedule.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import deLocale from '@fullcalendar/core/locales/de'; // Importieren des deutschen Locale-Pakets

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

  const convertSessionsToEvents = (sessions) => {
    return sessions.flatMap((group) =>
      group.sessions.map((session) => ({
        id: session.id,
        title: session.title,
        start: session.startsAt.replace("'", ''), // Korrigieren Sie den Startzeit-String, falls nötig
        end: session.endsAt.replace("'", ''), // Korrigieren Sie den Endzeit-String, falls nötig
        description: session.description,
        room: session.room,
      }))
    );
  };

  useEffect(() => {
    // Angenommen, scheduleJSON ist die JSON-Datenvariable
    const events = convertSessionsToEvents(scheduleJSON);
    setSessionData(events);
  }, []);

  // Optionale Funktion zur Anzeige der Event-Inhalte
  const renderEventContent = (eventInfo) => (
    <div className="flex flex-col">
      <span className="flex font-bold">{eventInfo.event.title}</span>
      <span className="flex">{eventInfo.timeText}</span>
      <span className="flex">Room: {eventInfo.event.extendedProps.room}</span>
      <span className="truncate">{eventInfo.event.extendedProps.description}</span>
    </div>
  );

  return (
    <div style={{ border: 'solid red' }}>
      <FullCalendar
        allDaySlot={false}
        plugins={[timeGridPlugin]}
        initialView="timeGrid"
        slotEventOverlap={false}
        slotLabelInterval={{ hours: 1 }}
        slotMinTime="08:00:00"
        slotMaxTime="24:00:00"
        height="auto"
        headerToolbar={{
          left: '',
          center: 'title',
          right: '',
        }}
        visibleRange={{
          start: '2024-07-01',
          end: '2024-07-03',
        }}
        events={sessionData}
        eventContent={renderEventContent} // Verwenden Sie dies, um benutzerdefinierte Inhalte anzuzeigen
        locale="de"
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
