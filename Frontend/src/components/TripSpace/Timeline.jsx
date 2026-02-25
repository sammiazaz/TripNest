import React, { useState } from 'react';
import { format } from 'date-fns';
import AddLogModal from '../Modals/AddLogModal';

const Timeline = ({ logs, trip, canEdit, onLogAdded }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Group logs by date
  const groupedLogs = logs?.reduce((acc, log) => {
    const dateKey = format(new Date(log.date), 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(log);
    return acc;
  }, {}) || {};

  const sortedDates = Object.keys(groupedLogs).sort((a, b) => new Date(b) - new Date(a));

  const handleAddLog = (date) => {
    setSelectedDate(date);
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setSelectedDate(null);
  };

  return (
    <div className="space-y-8">
      {sortedDates.map((date) => (
        <div key={date} className="relative">
          {/* Date Header */}
          <div className="flex items-center mb-6">
            <div className="flex-shrink-0 w-24">
              <div className="text-sm font-semibold text-teal-600">
                {format(new Date(date), 'MMM dd, yyyy')}
              </div>
            </div>
            <div className="flex-1 border-t-2 border-gray-200"></div>
          </div>

          {/* Logs for this date */}
          <div className="space-y-6 ml-12">
            {groupedLogs[date].map((log, index) => (
              <div key={log.id} className="relative group">
                {/* Timeline dot */}
                <div className="absolute -left-12 top-0">
                  <div className="w-6 h-6 rounded-full bg-teal-600 border-4 border-white shadow-md"></div>
                </div>

                {/* Log Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
                  {log.photo_url && (
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={log.photo_url}
                        alt={log.location || 'Log photo'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        {log.location && (
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{log.location}</h3>
                        )}
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {format(new Date(log.date), 'h:mm a')}
                        </div>
                      </div>

                      {canEdit && log.author?.id === JSON.parse(localStorage.getItem('user'))?.id && (
                        <div className="flex space-x-2">
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button className="text-gray-400 hover:text-red-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>

                    {log.notes && (
                      <p className="text-gray-700 leading-relaxed">{log.notes}</p>
                    )}

                    {/* Author info */}
                    <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                      {log.author?.avatar ? (
                        <img
                          src={log.author.avatar}
                          alt={log.author.name}
                          className="w-8 h-8 rounded-full mr-3"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                          <span className="text-teal-600 font-semibold text-sm">
                            {log.author?.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <span className="text-sm text-gray-600">{log.author?.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Log Button */}
          {canEdit && (
            <div className="ml-12 mt-4">
              <button
                onClick={() => handleAddLog(date)}
                className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 font-medium"
              >
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span>Add Log</span>
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Empty state */}
      {sortedDates.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-.806-.984A1 1 0 0021 7.618l-4.553-2.276A1 1 0 0115 7m0 13V7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No logs yet</h3>
          <p className="text-gray-600 mb-4">Start documenting your journey!</p>
          {canEdit && (
            <button
              onClick={() => handleAddLog(new Date().toISOString())}
              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition"
            >
              Add Your First Log
            </button>
          )}
        </div>
      )}

      {/* Add Log Modal */}
      {isAddModalOpen && (
        <AddLogModal
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          tripId={trip.id}
          selectedDate={selectedDate}
          onLogAdded={onLogAdded}
        />
      )}
    </div>
  );
};

export default Timeline;