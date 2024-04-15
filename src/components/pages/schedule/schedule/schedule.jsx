import React, { useEffect, useState } from 'react';
import scheduleJSON from './schedule.json'; //Daten aus der schedule.json
import './schedule.css';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

// const scriptUrl = 'https://sessionize.com/api/v2/t71l7ld5/view/GridSmart';
// const scriptUrl = 'https://sessionize.com/api/v2/6dqtqpt2/view/Sessions'; api -> sessionList
const speakerURL = 'https://sessionize.com/api/v2/6dqtqpt2/view/Speakers';

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
  const [visibleDay, setVisibleDay] = useState('2024-07-01');
  const [speakerData, setSpeakerData] = useState([]);

  //Speaker aus der api fetchen
  useEffect(() => {
    fetch(speakerURL)
      .then((response) => response.json())
      .then((data) => {
        setSpeakerData(data);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

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
          padding: '100px',
        }}
      >
        <div
          style={{
            position: 'relative',
            backgroundColor: 'rgb(237 237 237)',
            padding: '20px',
            borderRadius: '5px',
            color: 'black',
            width: 'auto',
          }}
        >
          <button
            className="text-primary-1"
            style={{
              position: 'absolute',
              right: '19px',
              top: '-4px',
              fontSize: '30px',
              fontWeight: 'bold',
            }}
            onClick={onClose}
          >
            x
          </button>
          {children}
        </div>
      </div>
    );
  }

  const handleDayChange = (day) => {
    setVisibleDay(day);
  };

  const convertSessionsToEvents = (sessions) => {
    return sessions.flatMap((group) =>
      group.sessions.map((session) => ({
        id: session.id,
        title: session.title,
        start: session.startsAt.replace("'", ''),
        end: session.endsAt.replace("'", ''),
        description: session.description,
        room: session.room,
        speakers: session.speakers,
      }))
    );
  };

  useEffect(() => {
    const events = convertSessionsToEvents(scheduleJSON);
    setSessionData(events);
  }, []);

  const renderEventContent = (eventInfo) => (
    <div
      className=" renderContent flex h-full w-full flex-col overflow-clip p-1 2xl:text-lg lg:text-sm md:text-xs  "
      onClick={() => {
        setSelectedEvent(eventInfo.event);
        setIsDialogOpen(true);
      }}
    >
      <span className="flex font-bold">{eventInfo.event.title}</span>
      <div className="flex overflow-hidden italic">
        Speaker:
        <div style={{ display: 'flex' }}>
          {eventInfo.event.extendedProps.speakers.map((speaker) => (
            <span>{speaker.name}</span>
          ))}
        </div>
        <span>{eventInfo.event.extendedProps.startAt}</span>
      </div>
    </div>
  );

  const EventDialog = () => {
    return (
      <div className="h-auto w-auto" style={{ padding: '25px' }}>
        {/* Main Title Above Both Columns */}
        <h2
          className="dialog-title font-black 2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl"
          style={{ marginBottom: '15px' }}
        >
          {selectedEvent.title}
        </h2>

        {/* Flex Container for Two Columns */}
        <div style={{ display: 'flex' }}>
          {/* Left Column for Event Information */}
          <div style={{ flex: 1, paddingRight: '10px' }}>
            <p className="dialog-start py-2 2xl:text-base">
              <strong>Start:</strong> {selectedEvent.start.toLocaleString()}
            </p>
            <p className="dialog-end py-2 2xl:text-base">
              <strong>End:</strong> {selectedEvent.end.toLocaleString()}
            </p>
            <p className="dialog-room py-2 2xl:text-base">
              <strong>Room:</strong> {selectedEvent.extendedProps.room}
            </p>
            <p
              className="dialog-description py-2 2xl:text-base"
              style={{ textAlign: 'left', height: '33vh', overflow: 'auto' }}
            >
              <strong>Description:</strong> {selectedEvent.extendedProps.description}
            </p>
          </div>

          {/* Right Column for Sample Participant Values */}
          <div style={{ flex: 1, paddingLeft: '10px' }}>
            {selectedEvent.extendedProps.speakers.map((speaker) => (
              <div></div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full overflow-hidden rounded-md" style={{ background: '#dadada21' }}>
      <div>
        <button onClick={() => handleDayChange('2024-07-01')}>Monday</button>
        <button onClick={() => handleDayChange('2024-07-02')}>Tuesday</button>
      </div>
      <div className="calendar-container">
        <div className="flex">
          <FullCalendar
            allDaySlot={false}
            plugins={[timeGridPlugin]}
            displayEventTime={false}
            initialView="timeGrid"
            slotEventOverlap={false}
            slotLabelInterval={{ hours: 1 }}
            slotMinTime="08:00:00"
            slotMaxTime="24:00:00"
            height="auto"
            headerToolbar={{
              left: '',
              right: '',
            }}
            visibleRange={{
              start: visibleDay,
              end: visibleDay === '2024-07-01' ? '2024-07-02' : '2024-07-03',
            }}
            events={sessionData}
            eventContent={renderEventContent}
            dayHeaderContent="Main Stage"
          />
          <FullCalendar
            allDaySlot={false}
            plugins={[timeGridPlugin]}
            displayEventTime={false}
            initialView="timeGrid"
            slotEventOverlap={false}
            slotLabelInterval={{ hours: 1 }}
            slotMinTime="08:00:00"
            slotMaxTime="24:00:00"
            height="auto"
            headerToolbar={{
              left: '',
              right: '',
            }}
            visibleRange={{
              start: visibleDay,
              end: visibleDay === '2024-07-01' ? '2024-07-02' : '2024-07-03',
            }}
            events={sessionData}
            eventContent={renderEventContent}
            dayHeaderContent="Top Stage"
          />
          <FullCalendar
            allDaySlot={false}
            plugins={[timeGridPlugin]}
            displayEventTime={false}
            initialView="timeGrid"
            slotEventOverlap={false}
            slotLabelInterval={{ hours: 1 }}
            slotMinTime="08:00:00"
            slotMaxTime="24:00:00"
            height="auto"
            headerToolbar={{
              left: '',
              right: '',
            }}
            visibleRange={{
              start: visibleDay,
              end: visibleDay === '2024-07-01' ? '2024-07-02' : '2024-07-03',
            }}
            events={sessionData}
            eventContent={renderEventContent}
            dayHeaderContent="Workshop Room"
          />
          <FullCalendar
            allDaySlot={false}
            plugins={[timeGridPlugin]}
            displayEventTime={false}
            initialView="timeGrid"
            slotEventOverlap={false}
            slotLabelInterval={{ hours: 1 }}
            slotMinTime="08:00:00"
            slotMaxTime="24:00:00"
            height="auto"
            headerToolbar={{
              left: '',
              right: '',
            }}
            visibleRange={{
              start: visibleDay,
              end: visibleDay === '2024-07-01' ? '2024-07-02' : '2024-07-03',
            }}
            events={sessionData}
            eventContent={renderEventContent}
            dayHeaderContent="The Unconference"
          />
        </div>
        <Dialog
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setSelectedEvent(null);
          }}
        >
          {selectedEvent && <EventDialog />}
        </Dialog>
      </div>
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
