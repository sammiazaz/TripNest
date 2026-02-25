import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';
import TripHeader from '../components/TripSpace/TripHeader';
import Timeline from '../components/TripSpace/Timeline';
import MapView from '../components/TripSpace/MapView';
import { tripsAPI, logsAPI } from '../services/api';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';

const TripDetail = () => {
  const { tripId } = useParams();
  const [searchParams] = useSearchParams();
  const inviteHash = searchParams.get('invite');
  
  const [trip, setTrip] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('timeline');
  
  const { user } = useAuth();
  const { joinTrip, leaveTrip, socket } = useSocket();

  useEffect(() => {
    fetchTripData();
    
    return () => {
      if (tripId) {
        leaveTrip(tripId);
      }
    };
  }, [tripId]);

  useEffect(() => {
    if (socket && tripId) {
      joinTrip(tripId);

      socket.on('log:created', (newLog) => {
        setLogs((prev) => [newLog, ...prev]);
      });

      socket.on('log:updated', (updatedLog) => {
        setLogs((prev) =>
          prev.map((log) => (log.id === updatedLog.id ? updatedLog : log))
        );
      });

      socket.on('log:deleted', ({ logId }) => {
        setLogs((prev) => prev.filter((log) => log.id !== logId));
      });

      socket.on('trip:updated', (updatedTrip) => {
        setTrip(updatedTrip);
      });

      return () => {
        socket.off('log:created');
        socket.off('log:updated');
        socket.off('log:deleted');
        socket.off('trip:updated');
      };
    }
  }, [socket, tripId]);

  const fetchTripData = async () => {
    try {
      setLoading(true);
      const tripResponse = await tripsAPI.getById(tripId);
      setTrip(tripResponse.data);

      const logsResponse = await logsAPI.getByTrip(tripId);
      setLogs(logsResponse.data);

      setError(null);
    } catch (err) {
      setError('Failed to load trip data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinTrip = async () => {
    if (!inviteHash) return;
    
    try {
      await tripsAPI.join(tripId, inviteHash, 'viewer');
      fetchTripData();
    } catch (err) {
      setError('Failed to join trip');
    }
  };

  const handleLogAdded = (newLog) => {
    setLogs((prev) => [newLog, ...prev]);
  };

  // Check permissions
  const isOwner = user && trip && trip.owner_id === user.id;
  const participant = trip?.participants?.find(p => p.user_id === user?.id);
  const canEdit = isOwner || participant?.permission === 'editor';
  const canView = isOwner || participant || trip?.is_public;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error || 'Trip not found'}</p>
          <button
            onClick={() => window.history.back()}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!canView) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">
            This trip is private. You need an invitation to view it.
          </p>
          {inviteHash && (
            <button
              onClick={handleJoinTrip}
              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition"
            >
              Join Trip
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />
      
      <main className="ml-64 pt-6 pb-12 px-8">
        <div className="max-w-7xl mx-auto">
          <TripHeader
            trip={trip}
            canEdit={canEdit}
            isOwner={isOwner}
            onViewModeChange={setViewMode}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Timeline/Map View */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                {viewMode === 'timeline' ? (
                  <Timeline
                    logs={logs}
                    trip={trip}
                    canEdit={canEdit}
                    onLogAdded={handleLogAdded}
                  />
                ) : (
                  <div className="h-[600px]">
                    <MapView logs={logs} trip={trip} />
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Trip Stats */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Trip Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Distance</span>
                    <span className="font-semibold text-gray-900">
                      {trip.total_distance || 0} km
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Logs</span>
                    <span className="font-semibold text-gray-900">{logs.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Photos</span>
                    <span className="font-semibold text-gray-900">
                      {logs.filter(l => l.photo_url).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold text-gray-900">
                      {Math.ceil((new Date(trip.end_date) - new Date(trip.start_date)) / (1000 * 60 * 60 * 24))} days
                    </span>
                  </div>
                </div>
              </div>

              {/* Participants */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Participants</h3>
                <div className="space-y-3">
                  {trip.participants?.map((participant, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {participant.avatar ? (
                          <img
                            src={participant.avatar}
                            alt={participant.name}
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                            <span className="text-teal-600 font-semibold">
                              {participant.name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{participant.name}</p>
                          <p className="text-sm text-gray-600 capitalize">
                            {participant.permission}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TripDetail;