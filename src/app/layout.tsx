import '../styles/globals.css';
import { AuthProvider } from '@/components/AuthProvider';
import { ConditionalLayout } from '@/components/ConditionalLayout';

export const metadata = {
  title: 'TripNest | The Ultimate Collaborative Travel Planner',
  description: 'Experience the future of travel planning with TripNest. Coordinate itineraries, split expenses, and share memories with your group in real-time.',
  keywords: ['travel', 'itinerary', 'group travel', 'trip planner', 'expense splitter'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AuthProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </AuthProvider>
      </body>
    </html>
  );
}