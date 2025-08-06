import PropTypes from 'prop-types';
import React from 'react';
import './schedule.css';

const ScheduleCard = ({
  startTime = '10:25 AM',
  endTime = '10:55 AM',
  duration = '30 min',
  title = 'Oh No Our Kubernetes Cluster Has Been Compromised! Will YOU Save the Day?',
  speakers = [
    { name: 'Benoit Entzmann', avatar: '/placeholder.svg?height=40&width=40' },
    { name: 'Chay Te', avatar: '/placeholder.svg?height=40&width=40' },
  ],
  location = 'Top Stage',
  type = 'talk',
  isFavorite = false,
  onFavoriteClick,
  onClick,
  isLive = false,
  isPast = false,
  hasRecording = false,
}) => {
  return (
    <div className={`schedule-card${isPast ? ' schedule-card--past' : ''}`} onClick={onClick}>
      <div className="schedule-card-header">
        <div className="schedule-card-time">
          <svg
            className="schedule-card-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="schedule-card-time-text">
            {startTime} - {endTime}
          </span>
          {isLive ? (
            <div className="schedule-card-live-indicator">
              <div className="schedule-card-live-dot">
                <div className="schedule-card-live-pulse"></div>
              </div>
              <span className="schedule-card-live-text">LIVE</span>
            </div>
          ) : (
            <span className="schedule-card-duration">{duration}</span>
          )}
        </div>
        <span className={`schedule-card-type schedule-card-type-${type}`}>
          {type === 'sponsor' ? 'Sponsor Talk' : type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </div>

      <div className="schedule-card-content">
        <h3 className="schedule-card-title">{title}</h3>

        {Array.isArray(speakers) && speakers.length > 0 && (
          <div className="schedule-card-speakers">
            <div className="schedule-card-avatars">
              {speakers.map((speaker, index) => (
                <div key={index} className="schedule-card-avatar">
                  <img
                    src={speaker.avatar}
                    alt={speaker.name}
                    className="schedule-card-avatar-image"
                  />
                </div>
              ))}
            </div>
            <div className="schedule-card-speaker-names">
              <svg
                className="schedule-card-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>{speakers.map((s) => s.name).join(', ')}</span>
            </div>
          </div>
        )}
      </div>

      <div className="schedule-card-footer">
        <div className="schedule-card-location">
          <svg
            className="schedule-card-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{location}</span>
        </div>
        {isPast && hasRecording && (
          <div className="schedule-card-recording-indicator" title="Recording available">
            <svg
              className="schedule-card-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
              width="16"
              height="16"
            >
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        )}
        <button
          className="schedule-card-favorite-button"
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteClick?.();
          }}
        >
          <svg
            className="schedule-card-favorite-icon"
            viewBox="0 0 24 24"
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

ScheduleCard.propTypes = {
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  duration: PropTypes.string,
  title: PropTypes.string,
  speakers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    })
  ),
  location: PropTypes.string,
  type: PropTypes.string,
  isFavorite: PropTypes.bool,
  onFavoriteClick: PropTypes.func,
  onClick: PropTypes.func,
  isLive: PropTypes.bool,
  isPast: PropTypes.bool,
  hasRecording: PropTypes.bool,
};

export default ScheduleCard;
