import '../styles/globals.css';
import { AuthProvider } from '@/components/AuthProvider';
import { ConditionalLayout } from '@/components/ConditionalLayout';

export const metadata = {
  title: 'TripNest — Collaborative Travel Companion',
  description: 'Plan, share, and experience trips together in real-time with TripNest.',
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