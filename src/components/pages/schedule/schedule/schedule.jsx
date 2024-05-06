import React, { useEffect, useState } from 'react';
import scheduleJSON from './schedule.json'; //Daten aus der schedule.json
import './schedule.css';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import Button from 'components/shared/button';
import { isMobile } from 'react-device-detect';
import Buttons from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

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
  const [currentStages, setCurrentStages] = useState('Stages');

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

  const setMainTopStageView = () => {
    setCurrentStages('Stages');
  };

  const setWorkshopUnconferenceView = () => {
    setCurrentStages('Workshops');
  };

  const renderEventContent = (eventInfo) => {
    const breakClasses =
      eventInfo.event.title === 'Lunch Break' || eventInfo.event.title === 'Coffee Break'
        ? 'break-event'
        : 'regular-event';

    const isCustomDebugProfiles = eventInfo.event.title === 'custom debug profiles in kubectl';
    const isOpenSSF =
      eventInfo.event.title ===
      'OpenSSF Scorecard: The Superhero That Saves Your Open Source Project!';

    const formatSpeakerName = (name) => {
      return name.replace(/"\w+"/g, '').trim(); // Entfernt Wörter in Anführungszeichen und überschüssige Leerzeichen
    };

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
              <div className="justify-content-evenly mt-0 flex flex-row content-center">
                {eventInfo.event.extendedProps.speakers.map((speaker, index) => (
                  <Card
                    style={{ scale: '0.8' }}
                    sx={{ maxWidth: 100, minWidth: 100 }}
                    className="mr-5 flex flex-col rounded-lg text-center"
                  >
                    <CardMedia
                      sx={{ height: 90 }}
                      image={findSpeakerProfile(speaker.id)}
                      className="rounded-sm"
                    />
                    <CardContent
                      className="flex items-center justify-center text-clip p-6 text-center"
                      style={{ height: '70px', background: '#01013d' }}
                    >
                      <span style={{ fontSize: '13px', color: 'whitesmoke', display: 'flex' }}>
                        {formatSpeakerName(speaker.name)}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
    const formatSpeakerName = (name) => {
      return name.replace(/"\w+"/g, '').trim(); // Entfernt Wörter in Anführungszeichen und überschüssige Leerzeichen
    };

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
              <div className="justify-content-evenly mt-0 flex flex-row flex-wrap content-center">
                {eventInfo.event.extendedProps.speakers.map((speaker, index) => (
                  <Card
                    style={{ scale: '0.8' }}
                    sx={{ maxWidth: 100, minWidth: 100 }}
                    className="mr-5 flex flex-col rounded-lg text-center"
                  >
                    <CardMedia
                      sx={{ height: 90 }}
                      image={findSpeakerProfile(speaker.id)}
                      className="rounded-sm"
                    />
                    <CardContent
                      className="flex items-center justify-center text-clip p-6 text-center"
                      style={{ height: '70px' }}
                    >
                      <span style={{ fontSize: '13px', color: 'whitesmoke', display: 'flex' }}>
                        {formatSpeakerName(speaker.name)}
                      </span>
                    </CardContent>
                  </Card>
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

  const renderButton = (label, onClick, isSelected) => (
    <Button
      className="border-nonemd:hidden group relative inline-flex w-fit items-center justify-center overflow-hidden"
      style={{ scale: '0.9' }}
      onClick={onClick}
    >
      <span
        className={`absolute h-full w-full bg-gradient-to-br ${
          isSelected
            ? 'from-[#ff00c6] via-[#ff5478] to-[#ff8a05]'
            : 'from-[#3333ff] via-[#3333ff] to-[#3333ff]'
        }`}
      ></span>
      <span className="bg-gray-900 duration-400 relative rounded-md px-6 py-3 transition-all ease-out group-hover:bg-opacity-0">
        <span className="relative font-bold text-white">{label}</span>
      </span>
    </Button>
  );

  const renderStageButton = (stageName, additionalClass) => (
    <Button
      className={`border-nonemd:hidden group relative inline-flex w-fit items-center justify-center overflow-hidden ${additionalClass}`}
      style={{ scale: '0.9', width: '200px', fontSize: '11px' }}
      onClick={() => handleViewChange(stageName)}
    >
      <span
        className={`absolute h-full w-full bg-gradient-to-br ${
          currentView === stageName
            ? 'from-[#ff00c6] via-[#ff5478] to-[#ff8a05]'
            : 'from-[#3333ff] via-[#3333ff] to-[#3333ff]'
        }`}
      ></span>
      <span className="bg-gray-900 duration-400 relative rounded-md px-6 py-3 transition-all ease-out group-hover:bg-opacity-0">
        <span className="relative font-bold text-white">{stageName}</span>
      </span>
    </Button>
  );
  const renderStageButtonDesktopMainTop = (stageName, additionalClass) => (
    <Button
      className={`border-nonemd:hidden group relative inline-flex w-fit items-center justify-center overflow-hidden ${additionalClass}`}
      style={{ scale: '0.9', width: '200px', fontSize: '11px' }}
      onClick={() => setMainTopStageView()}
    >
      <span
        className={`absolute h-full w-full bg-gradient-to-br ${
          currentStages === stageName
            ? 'from-[#ff00c6] via-[#ff5478] to-[#ff8a05]'
            : 'from-[#3333ff] via-[#3333ff] to-[#3333ff]'
        }`}
      ></span>
      <span className="bg-gray-900 duration-400 relative rounded-md px-6 py-3 transition-all ease-out group-hover:bg-opacity-0">
        <span className="relative font-bold text-white">{stageName}</span>
      </span>
    </Button>
  );

  const renderStageButtonDesktopWorkshop = (stageName, additionalClass) => (
    <Button
      className={`border-nonemd:hidden group relative inline-flex w-fit items-center justify-center overflow-hidden ${additionalClass}`}
      style={{ scale: '0.9', width: '200px', fontSize: '11px' }}
      onClick={() => setWorkshopUnconferenceView(stageName)}
    >
      <span
        className={`absolute h-full w-full bg-gradient-to-br ${
          currentStages === stageName
            ? 'from-[#ff00c6] via-[#ff5478] to-[#ff8a05]'
            : 'from-[#3333ff] via-[#3333ff] to-[#3333ff]'
        }`}
      ></span>
      <span className="bg-gray-900 duration-400 relative rounded-md px-6 py-3 transition-all ease-out group-hover:bg-opacity-0">
        <span className="relative font-bold text-white">{stageName}</span>
      </span>
    </Button>
  );

  return (
    <div className="w-full overflow-hidden rounded-md" style={{ background: '#dadada21' }}>
      {!isMobile ? (
        <div>
          <div style={{ marginBottom: '0.5rem' }}>
            {renderButton(
              'Monday',
              () => handleDayChange('2024-07-01'),
              visibleDay === '2024-07-01'
            )}
            {renderButton(
              'Tuesday',
              () => handleDayChange('2024-07-02'),
              visibleDay === '2024-07-02'
            )}
          </div>
          <div>
            {renderStageButtonDesktopMainTop('Stages', 'main-stage-btn')}
            {renderStageButtonDesktopWorkshop('Workshops', 'workshop-room-btn')}
          </div>
          <div className="calendar-container">
            <div style={{ display: 'flex' }}>
              {currentStages === 'Stages' ? (
                <div className="flex">
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
                    eventMinHeight={85}
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
                </div>
              ) : (
                <div className="flex">
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
              )}
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
            {renderButton(
              'Monday',
              () => handleDayChange('2024-07-01'),
              visibleDay === '2024-07-01'
            )}
            {renderButton(
              'Tuesday',
              () => handleDayChange('2024-07-02'),
              visibleDay === '2024-07-02'
            )}
          </div>
          <div className="flex" style={{ marginBottom: '0.5rem' }}>
            {renderStageButton('Main Stage', 'main-stage-btn')}
            {renderStageButton('Top Stage', 'top-stage-btn')}
            {renderStageButton('Workshop', 'workshop-room-btn')}
            {renderStageButton('Unconference', 'the-unconference-btn')}
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
                    : currentView === 'Workshop'
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
