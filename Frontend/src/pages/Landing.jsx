import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-teal-700">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="bg-white rounded-lg p-2">
            <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white">TripNest</span>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="bg-white text-teal-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:text-teal-100 font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-white text-teal-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center px-4 py-20 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Plan Adventures,<br />Together
        </h1>
        <p className="text-xl text-teal-100 mb-8 max-w-2xl">
          TripNest is your collaborative travel companion. Create shared trip spaces, 
          log memories in real-time, and explore the world with friends.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
            >
              Open Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
              >
                Start Free Trial
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-teal-600 transition"
              >
                Sign In
              </Link>
            </>
          )}
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full">
          {[
            {
              icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
              title: 'Interactive Maps',
              desc: 'Visualize your journey with custom markers and routes'
            },
            {
              icon: 'M12 4v16m8-8H4',
              title: 'Real-time Logs',
              desc: 'Add photos, notes, and locations instantly with friends'
            },
            {
              icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3',
              title: 'Smart Invites',
              desc: 'Share trips with view-only or edit permissions'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-left">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-teal-100 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-teal-200 text-sm">
        <p>© 2026 TripNest. Crafted with ❤️ for travelers By Raush.</p>
      </footer>
    </div>
  );
};

export default Landing;