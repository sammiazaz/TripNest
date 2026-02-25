import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const TripCard = ({ trip }) => {
  const getParticipantCount = () => {
    if (!trip.participants) return 1;
    return trip.participants.length;
  };

  const getBadgeColor = () => {
    if (trip.is_private) return 'bg-purple-600';
    return 'bg-teal-600';
  };

  return (
    <Link to={`/trip/${trip.id}`} className="block group">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 overflow-hidden">
          <img
            src={trip.cover_photo || `https://source.unsplash.com/800x600/?${trip.destination}`}
            alt={trip.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className={`${getBadgeColor()} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
              {trip.is_private ? 'PRIVATE' : 'SHARED TRIP'}
            </span>
          </div>
          {trip.logs_count > 0 && (
            <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1 text-sm font-medium text-gray-700">
              {trip.logs_count} logs
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition">
            {trip.title}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-3">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">
              {format(new Date(trip.start_date), 'MMM dd')} - {format(new Date(trip.end_date), 'MMM dd, yyyy')}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {trip.owner?.avatar && (
                <img
                  src={trip.owner.avatar}
                  alt={trip.owner.name}
                  className="w-6 h-6 rounded-full border-2 border-white"
                />
              )}
              <span className="text-sm text-gray-600">
                {getParticipantCount()} {getParticipantCount() === 1 ? 'person' : 'people'}
              </span>
            </div>

            <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-1 rounded">
              {trip.destination?.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TripCard;