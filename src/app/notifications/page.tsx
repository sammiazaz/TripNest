'use client';
import { useSession } from 'next-auth/react';

// Mock notifications — replace with real API data later
const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    type: 'expense',
    icon: 'payments',
    title: 'New expense added',
    message: 'Sammi Azaz added "Dinner at La Sponda" — €120.00',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    type: 'trip',
    icon: 'flight_takeoff',
    title: 'Trip reminder',
    message: '"Summer in Amalfi Coast" starts on Jul 14, 2024',
    time: '1 day ago',
    read: false,
  },
  {
    id: '3',
    type: 'member',
    icon: 'person_add',
    title: 'New member joined',
    message: 'Sammi Azaz joined "Summer in Amalfi Coast"',
    time: '3 days ago',
    read: true,
  },
  {
    id: '4',
    type: 'memory',
    icon: 'photo_camera',
    title: 'New memory uploaded',
    message: 'Sammi Azaz added "Beach day" to the Memory Vault',
    time: '4 days ago',
    read: true,
  },
  {
    id: '5',
    type: 'settle',
    icon: 'check_circle',
    title: 'Expense settled',
    message: 'You settled €40.00 with Sammi Azaz',
    time: '5 days ago',
    read: true,
  },
  {
    id: '6',
    type: 'itinerary',
    icon: 'event_note',
    title: 'Itinerary updated',
    message: 'Raushan Kumar updated the itinerary for Jul 15',
    time: '1 week ago',
    read: true,
  },
];

const TYPE_COLORS: Record<string, string> = {
  expense: 'bg-amber-50 text-amber-600',
  trip: 'bg-blue-50 text-blue-600',
  member: 'bg-emerald-50 text-emerald-600',
  memory: 'bg-purple-50 text-purple-600',
  settle: 'bg-green-50 text-green-600',
  itinerary: 'bg-cyan-50 text-cyan-600',
};

export default function NotificationsPage() {
  const { data: session } = useSession();
  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">Notifications</h1>
          <p className="text-sm text-slate-500 mt-1">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
              : 'You\'re all caught up!'}
          </p>
        </div>
        <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50">
          Mark all as read
        </button>
      </div>

      {/* Notifications list */}
      <div className="space-y-3">
        {MOCK_NOTIFICATIONS.map((notification) => (
          <div
            key={notification.id}
            className={`group relative flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 hover:shadow-md cursor-pointer ${
              notification.read
                ? 'bg-white border-slate-100 hover:border-slate-200'
                : 'bg-blue-50/30 border-blue-100 hover:border-blue-200 shadow-sm'
            }`}
          >
            {/* Unread dot */}
            {!notification.read && (
              <div className="absolute top-5 right-5 w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            )}

            {/* Icon */}
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                TYPE_COLORS[notification.type] ?? 'bg-slate-50 text-slate-500'
              }`}
            >
              <span
                className="material-symbols-outlined text-xl"
                data-icon={notification.icon}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {notification.icon}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className={`text-sm font-semibold ${notification.read ? 'text-slate-700' : 'text-slate-900'}`}>
                  {notification.title}
                </p>
              </div>
              <p className="text-sm text-slate-500 mt-0.5 truncate">
                {notification.message}
              </p>
              <p className="text-xs text-slate-400 mt-1.5">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state (shown when no notifications) */}
      {MOCK_NOTIFICATIONS.length === 0 && (
        <div className="text-center py-20">
          <span
            className="material-symbols-outlined text-6xl text-slate-200 mb-4 block"
            data-icon="notifications_off"
          >
            notifications_off
          </span>
          <h3 className="text-lg font-semibold text-slate-400">No notifications yet</h3>
          <p className="text-sm text-slate-400 mt-1">
            We&apos;ll let you know when something happens.
          </p>
        </div>
      )}
    </div>
  );
}
