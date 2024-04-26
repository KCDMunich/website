import React, { useEffect, useState } from 'react';
import scheduleJSON from './schedule.json'; //Daten aus der schedule.json
import './schedule.css';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import Button from 'components/shared/button';
import { isMobile } from 'react-device-detect';

const scriptUrl = 'https://sessionize.com/api/v2/6dqtqpt2/view/GridSmart';
// const scriptUrl = 'https://sessionize.com/api/v2/6dqtqpt2/view/Sessions'; api -> sessionList
const speakerURL = 'https://sessionize.com/api/v2/6dqtqpt2/view/Speakers';

const Schedule = () => (
  <section className="safe-paddings relative bg-white pb-40 lg:pb-32 md:py-24 sm:py-16">
    <div className="container-lg flex justify-between lg:flex-col">
      <div className="w-full text-primary-1 2xl:flex 2xl:flex-col 2xl:items-center 2xl:justify-center 2xl:text-center lg:flex lg:flex-col lg:items-center lg:justify-center lg:text-center">
        <SessionListComponent />
      </div>
    </div>
  </section>
);

const SessionListComponent = () => {
  const [speakerData, setSpeakerData] = useState([]);
  const [stageData, setStageData] = useState([]);
  const [mainstageData, setMainStageData] = useState([]);
  const [workshopData, setWorkshopData] = useState([]);
  const [unconferenceData, setUnconferenceData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [visibleDay, setVisibleDay] = useState('2024-07-01');
  const [currentView, setCurrentView] = useState('Main Stage');

  //Speaker aus der api fetchen
  useEffect(() => {
    fetch(speakerURL)
      .then((response) => response.json())
      .then((data) => {
        setSpeakerData(data);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  //Schedulegrid
  useEffect(() => {
    fetch(scriptUrl)
      .then((response) => response.json())
      .then((data) => {
        const events = convertSessionsToEvents(data);

        const roomEvents = events.filter(
          (event) =>
            event.room === 'Main Stage' ||
            event.title === 'Lunch Break' ||
            event.title === 'Coffee Break'
        );
        const topStageEvents = events.filter(
          (event) =>
            event.room === 'Top Stage' ||
            event.title === 'Lunch Break' ||
            event.title === 'Coffee Break'
        );
        const workshopRoomEvents = events.filter(
          (event) =>
            event.room === 'Workshop Room' ||
            event.title === 'Lunch Break' ||
            event.title === 'Coffee Break'
        );
        const unconferenceEvents = events.filter(
          (event) =>
            event.room === 'THE UNCONFERENCE' ||
            event.title === 'Lunch Break' ||
            event.title === 'Coffee Break'
        );
        setMainStageData(roomEvents);
        console.table(roomEvents);
        setStageData(topStageEvents);
        setWorkshopData(workshopRoomEvents);
        setUnconferenceData(unconferenceEvents);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  const findSpeakerProfile = (speakerId) => {
    const speaker = speakerData.find((s) => s.id === speakerId);
    return speaker.profilePicture;
  };

  const Dialog = ({ isOpen, onClose, children }) => {
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
            position: 'relative',
            backgroundColor: 'rgb(237 237 237)',
            borderRadius: '5px',
            color: 'black',
          }}
        >
          <button
            className="text-primary-1"
            style={{
              position: 'absolute',
              right: '19px',
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
  };

  const handleDayChange = (day) => {
    setVisibleDay(day);
  };

  const convertSessionsToEvents = (data) => {
    const events = [];

    data.forEach((day) => {
      day.rooms.forEach((room) => {
        const roomEvents = room.sessions.map((session) => ({
          id: session.id,
          title: session.title,
          start: session.startsAt,
          end: session.endsAt,
          description: session.description || '',
          room: session.room,
          speakers: session.speakers, // Adjusted for nested speaker data
        }));
        events.push(...roomEvents);
      });
    });

    return events;
  };

  const handleViewChange = (viewName) => {
    setCurrentView(viewName);
  };

  const renderEventContent = (eventInfo) => {
    const breakClasses =
      eventInfo.event.title === 'Lunch Break' || eventInfo.event.title === 'Coffee Break'
        ? 'break-event'
        : 'regular-event';

    const isCustomDebugProfiles = eventInfo.event.title === 'custom debug profiles in kubectl';

    return (
      <div
        className={`event-content ${breakClasses}`}
        onClick={() => {
          setSelectedEvent(eventInfo.event);
          setIsDialogOpen(true);
        }}
      >
        <span className="event-title">{eventInfo.event.title}</span>
        <h1 className="event-time">
          {new Date(eventInfo.event.start).toLocaleString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}{' '}
          -
          {new Date(eventInfo.event.end).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}
        </h1>

        {!isCustomDebugProfiles &&
          eventInfo.event.extendedProps.speakers &&
          eventInfo.event.extendedProps.speakers.length > 0 && (
            <div className="speaker-list">
              <span className="event-info" style={{ fontSize: '12px' }}>
                Speaker:
              </span>
              {eventInfo.event.extendedProps.speakers.map((speaker, index) => (
                <span className="speaker" key={index}>
                  {speaker.name}
                </span>
              ))}
            </div>
          )}
      </div>
    );
  };

  const renderMobileEventConent = (eventInfo) => {
    const breakClasses =
      eventInfo.event.title === 'Lunch Break' || eventInfo.event.title === 'Coffee Break'
        ? 'break-event'
        : 'regular-event';

    const isCustomDebugProfiles = eventInfo.event.title === 'custom debug profiles in kubectl';
    const isOpenSSF =
      eventInfo.event.title ===
      'OpenSSF Scorecard: The Superhero That Saves Your Open Source Project!';

    return (
      <div
        className={`event-content ${breakClasses}`}
        onClick={() => {
          setSelectedEvent(eventInfo.event);
          setIsDialogOpen(true);
        }}
      >
        <span className="event-title">{eventInfo.event.title}</span>
        <h1 className="event-time">
          {new Date(eventInfo.event.start).toLocaleString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}{' '}
          -
          {new Date(eventInfo.event.end).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}
        </h1>

        {!isCustomDebugProfiles &&
          !isOpenSSF &&
          eventInfo.event.extendedProps.speakers &&
          eventInfo.event.extendedProps.speakers.length > 0 && (
            <div className="speaker-list">
              <span className="event-info" style={{ fontSize: '12px' }}>
                Speaker:
              </span>
              <div className="mt-5 flex flex-row place-content-evenly content-center">
                {eventInfo.event.extendedProps.speakers.map((speaker, index) => (
                  <div className="flex flex-col  items-center ">
                    <img
                      className=""
                      src={findSpeakerProfile(speaker.id)}
                      alt={speaker.fullName}
                      style={{ width: '50px', borderRadius: '8px' }}
                    />
                    <span className="speaker" key={index}>
                      {speaker.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    );
  };

  const EventDialog = () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '90vw',
          padding: '50px',
          overflow: 'auto',
          height: '70vh',
        }}
      >
        <h1 style={{ marginBottom: '15px', fontWeight: 'bold', fontSize: 'larger' }}>
          {selectedEvent.title}
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', gap: '10px' }}>
          <p>
            <strong>Start:</strong> {selectedEvent.start.toLocaleString()}
          </p>
          <p>
            <strong>End:</strong> {selectedEvent.end.toLocaleString()}
          </p>
          <p>
            <strong>Room:</strong> {selectedEvent.extendedProps.room}
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
            marginTop: '10px',
          }}
        >
          <div>
            <strong>Description:</strong>
          </div>{' '}
          {selectedEvent.extendedProps.description}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full overflow-hidden rounded-md" style={{ background: '#dadada21' }}>
      {!isMobile ? (
        <div>
          <div style={{ marginBottom: '0.5rem' }}>
            <Button
              className="border-nonemd:hidden group relative inline-flex w-fit items-center justify-center overflow-hidden"
              style={{ scale: '0.9' }}
              onClick={() => handleDayChange('2024-07-01')}
            >
              <span className="absolute h-full w-full bg-gradient-to-br from-[#3333ff] via-[#3333ff] to-[#3333ff] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05]"></span>
              <span className="bg-gray-900 duration-400 relative rounded-md px-6 py-3 transition-all ease-out group-hover:bg-opacity-0">
                <span className="relative font-bold text-white">Monday</span>
              </span>
            </Button>
            <Button
              className="border-nonemd:hidden group relative inline-flex w-fit items-center justify-center overflow-hidden"
              style={{ scale: '0.9' }}
              onClick={() => handleDayChange('2024-07-02')}
            >
              <span className="absolute h-full w-full bg-gradient-to-br from-[#3333ff] via-[#3333ff] to-[#3333ff] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05]"></span>
              <span className="bg-gray-900 duration-400 relative rounded-md px-6 py-3 transition-all ease-out group-hover:bg-opacity-0">
                <span className="relative font-bold text-white">Tuesday</span>
              </span>
            </Button>
          </div>
          <div className="calendar-container">
            <div style={{ display: 'flex' }}>
              <FullCalendar
                allDaySlot={false}
                plugins={[timeGridPlugin]}
                displayEventTime={false}
                initialView="timeGrid"
                slotEventOverlap={false}
                slotLabelInterval={{ hours: 1 }}
                slotMinTime="09:20:00"
                slotMaxTime="18:00:00"
                slotDuration="00:08:30"
                height="auto"
                headerToolbar={{
                  left: '',
                  right: '',
                }}
                visibleRange={{
                  start: visibleDay,
                  end: visibleDay === '2024-07-01' ? '2024-07-02' : '2024-07-03',
                }}
                events={mainstageData}
                eventContent={renderEventContent}
                dayHeaderContent="Main Stage"
              />
              <FullCalendar
                allDaySlot={false}
                plugins={[timeGridPlugin]}
                displayEventTime={false}
                initialView="timeGrid"
                eventMinHeight={90}
                slotEventOverlap={false}
                slotLabelInterval={{ hours: 1 }}
                slotMinTime="09:20:00"
                slotMaxTime="18:00:00"
                slotDuration="00:08:30"
                height="auto"
                headerToolbar={{
                  left: '',
                  right: '',
                }}
                visibleRange={{
                  start: visibleDay,
                  end: visibleDay === '2024-07-01' ? '2024-07-02' : '2024-07-03',
                }}
                events={stageData}
                eventContent={renderEventContent}
                dayHeaderContent="Top Stage"
              />
              <FullCalendar
                allDaySlot={false}
                plugins={[timeGridPlugin]}
                displayEventTime={false}
                initialView="timeGrid"
                slotEventOverlap={true}
                slotMinWidth={200}
                slotLabelInterval={{ hours: 1 }}
                slotMinTime="09:20:00"
                slotMaxTime="18:00:00"
                slotDuration="00:08:30"
                height="auto"
                headerToolbar={{
                  left: '',
                  right: '',
                }}
                visibleRange={{
                  start: visibleDay,
                  end: visibleDay === '2024-07-01' ? '2024-07-02' : '2024-07-03',
                }}
                events={workshopData}
                eventContent={renderEventContent}
                dayHeaderContent="Workshop Room"
              />
              <FullCalendar
                allDaySlot={false}
                plugins={[timeGridPlugin]}
                displayEventTime={false}
                initialView="timeGrid"
                slotEventOverlap={true}
                slotMinWidth={50}
                slotLabelInterval={{ hours: 1 }}
                slotMinTime="09:20:00"
                slotMaxTime="18:00:00"
                slotDuration="00:08:30"
                height="auto"
                headerToolbar={{
                  left: '',
                  right: '',
                }}
                visibleRange={{
                  start: visibleDay,
                  end: visibleDay === '2024-07-01' ? '2024-07-02' : '2024-07-03',
                }}
                events={unconferenceData}
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
      ) : (
        <div>
          <div style={{ marginBottom: '0.5rem' }}>
            <Button
              className="border-nonemd:hidden group relative inline-flex w-fit items-center justify-center overflow-hidden"
              style={{ scale: '0.9' }}
              onClick={() => handleDayChange('2024-07-01')}
            >
              <span className="absolute h-full w-full bg-gradient-to-br from-[#3333ff] via-[#3333ff] to-[#3333ff] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05]"></span>
              <span className="bg-gray-900 duration-400 relative rounded-md px-6 py-3 transition-all ease-out group-hover:bg-opacity-0">
                <span className="relative font-bold text-white">Monday</span>
              </span>
            </Button>
            <Button
              className="border-nonemd:hidden group relative inline-flex w-fit items-center justify-center overflow-hidden"
              style={{ scale: '0.9' }}
              onClick={() => handleDayChange('2024-07-02')}
            >
              <span className="absolute h-full w-full bg-gradient-to-br from-[#3333ff] via-[#3333ff] to-[#3333ff] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05]"></span>
              <span className="bg-gray-900 duration-400 relative rounded-md px-6 py-3 transition-all ease-out group-hover:bg-opacity-0">
                <span className="relative font-bold text-white">Tuesday</span>
              </span>
            </Button>
          </div>
          <div className="flex" style={{ marginBottom: '0.5rem' }}>
            <Button
              className="main-stage-btn border-nonemd:hidden group relative inline-flex w-fit items-center justify-center overflow-hidden"
              style={{ scale: '0.7' }}
              onClick={() => handleViewChange('Main Stage')}
            >
              <span className="absolute h-full w-full bg-gradient-to-br from-[#3333ff] via-[#3333ff] to-[#3333ff] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05]"></span>
              <span className="bg-gray-900 duration-400 relative rounded-md px-6 py-3 transition-all ease-out group-hover:bg-opacity-0">
                <span className="relative font-bold text-white">Main Stage</span>
              </span>
            </Button>
            <Button
              className="top-stage-btn border-nonemd:hidden group relative inline-flex w-fit items-center justify-center overflow-hidden"
              style={{ scale: '0.7' }}
              onClick={() => handleViewChange('Top Stage')}
            >
              <span className="absolute h-full w-full bg-gradient-to-br from-[#3333ff] via-[#3333ff] to-[#3333ff] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05]"></span>
              <span className="bg-gray-900 duration-400 relative rounded-md px-6 py-3 transition-all ease-out group-hover:bg-opacity-0">
                <span className="relative font-bold text-white">Top Stage</span>
              </span>
            </Button>
            <Button
              className="workshop-room-btn border-nonemd:hidden group relative inline-flex w-fit items-center justify-center overflow-hidden"
              style={{ scale: '0.7' }}
              onClick={() => handleViewChange('Workshop Room')}
            >
              <span className="absolute h-full w-full bg-gradient-to-br from-[#3333ff] via-[#3333ff] to-[#3333ff] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05]"></span>
              <span className="bg-gray-900 duration-400 relative rounded-md px-6 py-3 transition-all ease-out group-hover:bg-opacity-0">
                <span className="relative font-bold text-white">Workshop Room</span>
              </span>
            </Button>
            <Button
              className="the-unconference-btn border-nonemd:hidden group relative inline-flex w-fit items-center justify-center overflow-hidden"
              style={{ scale: '0.7' }}
              onClick={() => handleViewChange('The Unconference')}
            >
              <span className="absolute h-full w-full bg-gradient-to-br from-[#3333ff] via-[#3333ff] to-[#3333ff] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05]"></span>
              <span className="bg-gray-900 duration-400 relative rounded-md px-6 py-3 transition-all ease-out group-hover:bg-opacity-0">
                <span className="relative font-bold text-white">The Unconference</span>
              </span>
            </Button>
          </div>
          <div className="calendar-container" style={{ width: 'fit-content', overflow: 'auto' }}>
            <div style={{ display: 'flex' }}>
              <FullCalendar
                allDaySlot={false}
                plugins={[timeGridPlugin]}
                displayEventTime={false}
                eventMinHeight={92}
                initialView="timeGrid"
                slotEventOverlap={false}
                slotLabelInterval={{ hours: 1 }}
                slotMinTime="09:20:00"
                slotMaxTime="18:00:00"
                slotDuration="00:08:30"
                height="auto"
                headerToolbar={{
                  left: '',
                  right: '',
                }}
                visibleRange={{
                  start: visibleDay,
                  end: visibleDay === '2024-07-01' ? '2024-07-02' : '2024-07-03',
                }}
                events={
                  currentView === 'Main Stage'
                    ? mainstageData
                    : currentView === 'Top Stage'
                    ? stageData
                    : currentView === 'Workshop Room'
                    ? workshopData
                    : unconferenceData
                }
                eventContent={renderMobileEventConent}
                dayHeaderContent={currentView}
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
      )}
    </div>
  );
};

export default Schedule;
