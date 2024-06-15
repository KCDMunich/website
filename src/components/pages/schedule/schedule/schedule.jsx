import React, { useEffect, useState } from 'react';
import scheduleJSON from './schedule.json'; //Daten aus der schedule.json
import './schedule.css';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import Button from 'components/shared/button';
import { isMobile } from 'react-device-detect';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';

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
  const [isLoading, setIsLoading] = useState(true);
  const [sponsorStageData, setSponsorStageData] = useState([]);
  const [santoriniData, setSantoriniData] = useState([]);
  const [dubrovnikData, setDubrovnikData] = useState([]);

  //Speaker aus der api fetchen
  useEffect(() => {
    fetch(speakerURL)
      .then((response) => response.json())
      .then((data) => {
        setSpeakerData(data);
        setIsLoading(true);
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
        const sponsorStageEvents = events.filter(
          (event) =>
            event.room === 'Sponsor Stage' ||
            event.title === 'Lunch Break' ||
            event.title === 'Coffee Break'
        );
        const dubrovnikEvents = events.filter(
          (event) =>
            event.room === 'Dubrovnik' ||
            event.title === 'Lunch Break' ||
            event.title === 'Coffee Break'
        );

        const santoriniEvents = events.filter(
          (event) =>
            event.room === 'Santorini' ||
            event.title === 'Lunch Break' ||
            event.title === 'Coffee Break'
        );
        setSantoriniData(santoriniEvents);
        setDubrovnikData(dubrovnikEvents);
        setSponsorStageData(sponsorStageEvents);
        setMainStageData(roomEvents);
        setStageData(topStageEvents);
        setWorkshopData(workshopRoomEvents);
        setUnconferenceData(unconferenceEvents);
        setIsLoading(false);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  const findSpeakerProfile = (speakerId) => {
    const speaker = speakerData.find((s) => s.id === speakerId);
    return speaker ? speaker.profilePicture : null;
  };

  const Dialog = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isOpen]);

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

  const setSponsorView = () => {
    setCurrentStages('Sponsor');
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
      return name.replace(/"\w+"/g, '').trim();
    };

    const isBreakEvent =
      eventInfo.event.title === 'Lunch Break' || eventInfo.event.title === 'Coffee Break';

    return (
      <div
        className={`event-content ${breakClasses}`}
        onClick={
          !isBreakEvent
            ? () => {
                setSelectedEvent(eventInfo.event);
                setIsDialogOpen(true);
              }
            : null
        }
        style={{ width: '100%', height: '100%', cursor: !isBreakEvent ? 'pointer' : 'default' }}
      >
        <div className="h-full w-full rounded-lg bg-[transparent] p-4 text-white">
          <div className="mb-4 border-b border-white pb-2">
            <span className="event-title">{eventInfo.event.title}</span>
            <h1 className="event-time">
              {new Date(eventInfo.event.start).toLocaleString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              -
              {new Date(eventInfo.event.end).toLocaleString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </h1>
          </div>
          {!isCustomDebugProfiles && !isOpenSSF && (
            <div className="-mx-2 flex flex-wrap">
              {eventInfo.event.extendedProps.speakers.map((speaker, index) => (
                <div key={index} className="flex items-center px-2 py-1">
                  <Avatar
                    alt={speaker.name}
                    src={findSpeakerProfile(speaker.id)}
                    sx={{ width: 50, height: 50 }}
                  />
                  <div className="ml-2 flex flex-col">
                    <span className="font-medium">{formatSpeakerName(speaker.name)}</span>
                    <span className="text-xs text-white/70">Speaker</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderMobileEventContent = (eventInfo) => {
    const breakClasses =
      eventInfo.event.title === 'Lunch Break' || eventInfo.event.title === 'Coffee Break'
        ? 'break-event'
        : 'regular-event';

    const isCustomDebugProfiles = eventInfo.event.title === 'custom debug profiles in kubectl';
    const isOpenSSF =
      eventInfo.event.title ===
      'OpenSSF Scorecard: The Superhero That Saves Your Open Source Project!';
    const formatSpeakerName = (name) => {
      return name.replace(/"\w+"/g, '').trim();
    };

    const isBreakEvent =
      eventInfo.event.title === 'Lunch Break' || eventInfo.event.title === 'Coffee Break';

    return (
      <div
        className={`event-content ${breakClasses}`}
        onClick={
          !isBreakEvent
            ? () => {
                setSelectedEvent(eventInfo.event);
                setIsDialogOpen(true);
              }
            : null
        }
        style={{ width: '100%', height: '100%', cursor: !isBreakEvent ? 'pointer' : 'default' }}
      >
        <div className="h-full w-full rounded-lg bg-[transparent] p-4 text-white">
          <div className="mb-4 border-b border-white pb-2">
            <span className="event-title">{eventInfo.event.title}</span>
            <h1 className="event-time">
              {new Date(eventInfo.event.start).toLocaleString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              -
              {new Date(eventInfo.event.end).toLocaleString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </h1>
          </div>
          {!isCustomDebugProfiles && !isOpenSSF && (
            <div className="-mx-2 flex flex-wrap">
              {eventInfo.event.extendedProps.speakers.map((speaker, index) => (
                <div key={index} className="flex items-center px-2 py-1">
                  <Avatar
                    alt={speaker.name}
                    src={findSpeakerProfile(speaker.id)}
                    sx={{ width: 50, height: 50 }}
                  />
                  <div className="ml-2 flex flex-col">
                    <span className="font-medium">{formatSpeakerName(speaker.name)}</span>
                    <span className="text-xs text-white/70">Speaker</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const EventDialog = () => {
    const formatSpeakerName = (name) => {
      return name.replace(/"\w+"/g, '').trim();
    };

    const formatTime = (date) => {
      return new Date(date).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '90vw',
          padding: '50px',
          height: 'fit-content',
        }}
      >
        <div className="mb-5 flex h-1/6 items-center justify-center">
          <h2 className="text-center text-xl font-bold">{selectedEvent.title}</h2>
        </div>
        <Divider />
        <div className="my-5 flex h-1/6 flex-wrap items-center justify-center gap-x-2">
          <Chip
            className="text-sm"
            label={`Start: ${formatTime(selectedEvent.start)}`}
            style={{ background: '#e0f2fe', color: '#0284c7' }}
          />
          <Chip
            className="text-sm"
            label={`End: ${formatTime(selectedEvent.end)}`}
            style={{ background: '#fef3c7', color: '#d97706' }}
          />
          <Chip
            className="text-sm"
            label={`Room: ${selectedEvent.extendedProps.room}`}
            style={{ background: '#e9d5ff', color: '#7c3aed' }}
          />
        </div>
        <div className="mb-5 h-3/6 text-left">{selectedEvent.extendedProps.description}</div>
        <Divider />
        <div className="mt-5 flex h-1/6 flex-wrap gap-x-2">
          {selectedEvent.extendedProps.speakers.map((speaker, index) => (
            <div key={index} className="flex items-center px-2 py-1">
              <Avatar
                alt={speaker.name}
                src={findSpeakerProfile(speaker.id)}
                sx={{ width: 50, height: 50 }}
              />
              <div className="ml-2 flex flex-col">
                <span className="font-medium">{formatSpeakerName(speaker.name)}</span>
                <span className="text-gray-400 text-xs">Speaker</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const EventDialogMobile = () => {
    const formatSpeakerName = (name) => name.replace(/"\w+"/g, '').trim();

    const formatTime = (date) =>
      new Date(date).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '90vw',
          padding: '50px',
          height: '85vh',
          boxSizing: 'border-box',
        }}
      >
        <div className="mb-5 flex h-1/6 items-center justify-center">
          <h2 className="text-center text-xl font-bold">{selectedEvent.title}</h2>
        </div>
        <Divider />
        <div className="my-5 flex flex-wrap items-center justify-center gap-x-1">
          <Chip
            className="mb-1 text-sm"
            label={`Start: ${formatTime(selectedEvent.start)}`}
            sx={{ height: '20px' }}
            style={{ background: '#e0f2fe', color: '#0284c7' }}
          />
          <Chip
            className="mb-1 text-sm"
            label={`End: ${formatTime(selectedEvent.end)}`}
            sx={{ height: '20px' }}
            style={{ background: '#fef3c7', color: '#d97706' }}
          />
          <Chip
            className=" text-sm"
            label={`Room: ${selectedEvent.extendedProps.room}`}
            sx={{ height: '20px' }}
            style={{ background: '#e9d5ff', color: '#7c3aed' }}
          />
        </div>
        <div
          className="description mb-5 text-left"
          style={{
            maxHeight: '30vh',
            overflowY: 'auto',
          }}
        >
          {selectedEvent.extendedProps.description}
        </div>
        <Divider />
        <div className="mt-5 flex flex-wrap gap-x-2">
          {selectedEvent.extendedProps.speakers.map((speaker, index) => (
            <div key={index} className="flex items-center px-2 py-2">
              <Avatar
                alt={speaker.name}
                src={findSpeakerProfile(speaker.id)}
                sx={{ width: 50, height: 50 }}
              />
              <div className="ml-2 flex flex-col">
                <span className="font-medium">{formatSpeakerName(speaker.name)}</span>
                <span className="text-gray-400 text-xs">Speaker</span>
              </div>
            </div>
          ))}
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
      />
      <span className="bg-gray-900 duration-400 relative rounded-md px-6 py-3 transition-all ease-out group-hover:bg-opacity-0">
        <span className="relative font-bold text-white">{label}</span>
      </span>
    </Button>
  );

  const renderStageButton = (stageName, additionalClass) => (
    <Button
      className={`border-nonemd:hidden group relative inline-flex w-fit items-center justify-center overflow-hidden ${additionalClass}`}
      style={{ scale: '0.9', width: '200px', fontSize: '9px' }}
      onClick={() => handleViewChange(stageName)}
    >
      <span
        className={`absolute h-full w-full bg-gradient-to-br ${
          currentView === stageName
            ? 'from-[#ff00c6] via-[#ff5478] to-[#ff8a05]'
            : 'from-[#3333ff] via-[#3333ff] to-[#3333ff]'
        }`}
      />
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
      />
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
      />
      <span className="bg-gray-900 duration-400 relative rounded-md px-6 py-3 transition-all ease-out group-hover:bg-opacity-0">
        <span className="relative font-bold text-white">{stageName}</span>
      </span>
    </Button>
  );
  const renderStageButtonDesktopSponsor = (stageName, additionalClass) => (
    <Button
      className={`border-nonemd:hidden group relative inline-flex w-fit items-center justify-center overflow-hidden ${additionalClass}`}
      style={{ scale: '0.9', width: '200px', fontSize: '11px' }}
      onClick={() => setSponsorView()}
    >
      <span
        className={`absolute h-full w-full bg-gradient-to-br ${
          currentStages === 'Sponsor'
            ? 'from-[#ff00c6] via-[#ff5478] to-[#ff8a05]'
            : 'from-[#3333ff] via-[#3333ff] to-[#3333ff]'
        }`}
      />
      <span className="bg-gray-900 duration-400 relative rounded-md px-6 py-3 transition-all ease-out group-hover:bg-opacity-0">
        <span className="relative font-bold text-white">{stageName}</span>
      </span>
    </Button>
  );

  if (isLoading) {
    <div>
      <CircularProgress color="secondary" />
    </div>;
  }

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
            {renderStageButtonDesktopSponsor('Workshops & Sponsor', 'sponsor-room-btn')}
          </div>
          <div className="calendar-container">
            {currentStages === 'Stages' && (
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
                  headerToolbar={{ left: '', right: '' }}
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
                  headerToolbar={{ left: '', right: '' }}
                  visibleRange={{
                    start: visibleDay,
                    end: visibleDay === '2024-07-01' ? '2024-07-02' : '2024-07-03',
                  }}
                  events={stageData}
                  eventContent={renderEventContent}
                  dayHeaderContent="Top Stage"
                />
              </div>
            )}
            {currentStages === 'Workshops' && (
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
                  headerToolbar={{ left: '', right: '' }}
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
                  headerToolbar={{ left: '', right: '' }}
                  visibleRange={{
                    start: visibleDay,
                    end: visibleDay === '2024-07-01' ? '2024-07-02' : '2024-07-03',
                  }}
                  events={dubrovnikData}
                  eventContent={renderEventContent}
                  dayHeaderContent="Dubrovnik"
                />
              </div>
            )}
            {currentStages === 'Sponsor' && (
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
                  headerToolbar={{ left: '', right: '' }}
                  visibleRange={{
                    start: visibleDay,
                    end: visibleDay === '2024-07-01' ? '2024-07-02' : '2024-07-03',
                  }}
                  events={santoriniData}
                  eventContent={renderEventContent}
                  dayHeaderContent="Santorini"
                />
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
                  headerToolbar={{ left: '', right: '' }}
                  visibleRange={{
                    start: visibleDay,
                    end: visibleDay === '2024-07-01' ? '2024-07-02' : '2024-07-03',
                  }}
                  events={sponsorStageData}
                  eventContent={renderEventContent}
                  dayHeaderContent="Sponsor"
                />
              </div>
            )}
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
            {renderStageButton('Santorini', 'santorini-btn')}
            {renderStageButton('Sponsor', 'sponsor-btn')}
            {renderStageButton('Dubrovnik', 'santorini-btn')}
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
                    : currentView === 'Santorini'
                    ? santoriniData
                    : currentView === 'Sponsor'
                    ? sponsorStageData
                    : dubrovnikData
                }
                eventContent={renderMobileEventContent}
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
              {selectedEvent && <EventDialogMobile />}
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
