import React, { useEffect, useState } from 'react';
import scheduleJSON from './schedule.json'; //Daten aus der schedule.json
import './schedule.css';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { isMobile } from 'react-device-detect';
import Modal from 'react-modal';
// const scriptUrl = 'https://sessionize.com/api/v2/t71l7ld5/view/GridSmart';
// const scriptUrl = 'https://sessionize.com/api/v2/6dqtqpt2/view/Sessions'; api -> sessionList

const Schedule = () => {
  return (
    <section className="safe-paddings relative bg-white pb-40 lg:pb-32 md:py-24 sm:py-16">
      <div className="container-lg flex justify-between lg:flex-col">
        <div className="w-full text-primary-1 2xl:flex 2xl:flex-col 2xl:items-center 2xl:justify-center 2xl:text-center lg:flex lg:flex-col lg:items-center lg:justify-center lg:text-center">
          <SessionListComponent />
        </div>
      </div>
    </section>
  );
};

const SessionListComponent = () => {
  const [sessionData, setSessionData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // useEffect(() => {
  //   fetch(scriptUrl)
  //     .then((response) => response.json())
  //     .then((data) => setSessionData(data))
  //     .catch((error) => console.error('Error:', error));
  // }, []);

  function Dialog({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
      <div
        style={{
          zIndex: '500000',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            border: 'solid rgb(13, 50, 233)',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '5px',
            width: '50vw',
            height: '50vh',
            color: 'black',
          }}
        >
          {children}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  const convertSessionsToEvents = (sessions) => {
    return sessions.flatMap((group) =>
      group.sessions.map((session) => ({
        id: session.id,
        title: session.title,
        start: session.startsAt.replace("'", ''),
        end: session.endsAt.replace("'", ''),
        description: session.description,
        room: session.room,
      }))
    );
  };

  useEffect(() => {
    const events = convertSessionsToEvents(scheduleJSON);
    setSessionData(events);
  }, []);

  const renderEventContent = (eventInfo) => (
    <div
      className=" flex h-full w-full flex-col overflow-clip p-1 2xl:text-lg lg:text-base md:text-sm sm:text-xs "
      onClick={() => {
        setSelectedEvent(eventInfo.event);
        setIsDialogOpen(true);
      }}
    >
      <span className="flex font-bold">{eventInfo.event.title}</span>
      <span className="flex">{eventInfo.timeText}</span>
      <span className="flex overflow-hidden italic">
        Room: {eventInfo.event.extendedProps.room}
      </span>
    </div>
  );

  const renderEventContentMobile = (eventInfo) => (
    <div
      className="textContainer flex h-full w-full flex-col overflow-clip"
      style={{ paddingLeft: '4px', fontSize: '10px' }}
    >
      <span className="flex font-bold">{eventInfo.event.title}</span>
      <span className="flex">{eventInfo.timeText}</span>
      <span className="flex overflow-hidden italic">
        Room: {eventInfo.event.extendedProps.room}
      </span>
    </div>
  );

  return (
    <div className="w-full overflow-hidden rounded-md" style={{ background: '#dadada21' }}>
      {!isMobile ? (
        <div>
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
            eventContent={renderEventContent}
            locale="de"
          />
          <Dialog
            isOpen={isDialogOpen}
            onClose={() => {
              setIsDialogOpen(false);
              setSelectedEvent(null);
            }}
          >
            {selectedEvent && (
              <div className="h-full w-full">
                <h2 className="font-bold">{selectedEvent.title}</h2>
                <p>
                  <strong>Start:</strong> {selectedEvent.start.toLocaleString()}
                </p>{' '}
                <p>
                  <strong>End:</strong> {selectedEvent.end.toLocaleString()}
                </p>{' '}
                <p>
                  <strong>Description:</strong> {selectedEvent.extendedProps.description}
                </p>{' '}
                <p>
                  <strong>Room:</strong> {selectedEvent.extendedProps.room}
                </p>{' '}
              </div>
            )}
          </Dialog>
        </div>
      ) : (
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
          eventContent={renderEventContentMobile}
          locale="de"
        />
      )}
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
