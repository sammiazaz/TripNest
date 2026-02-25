import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // ✅ Add this import
import { tripsAPI } from '../../services/api';
import TripCard from './TripCard';

const TripList = ({ filter = 'all' }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, [filter]);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const response = await tripsAPI.getAll();
      setTrips(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load trips');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTrips = trips.filter((trip) => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return new Date(trip.start_date) > new Date();
    if (filter === 'past') return new Date(trip.end_date) < new Date();
    if (filter === 'drafts') return trip.status === 'draft';
    return true;
  });

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-48 bg-gray-200 animate-pulse" />
            <div className="p-5 space-y-3">
              <div className="h-6 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchTrips}
          className="mt-4 text-teal-600 hover:text-teal-700 font-medium"
        >
          Try again
        </button>
      </div>
    );
  }

  if (filteredTrips.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-.806-.984A1 1 0 0021 7.618l-4.553-2.276A1 1 0 0115 7m0 13V7" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No trips</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new trip.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredTrips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
      
      {/* Add New Trip Card */}
      <Link to="/trips/new" className="block group">
        <div className="border-2 border-dashed border-gray-300 rounded-xl h-full min-h-[300px] flex flex-col items-center justify-center p-6 hover:border-teal-500 hover:bg-teal-50 transition cursor-pointer">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-teal-200 transition">
            <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Plan Another Adventure</h3>
          <p className="text-sm text-gray-500 text-center">Start adding destinations, dates and invite friends.</p>
        </div>
      </Link>
    </div>
  );
};

export default TripList;