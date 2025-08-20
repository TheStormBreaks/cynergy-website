import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import Header from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/auth-context';
import { EventsProvider } from '@/contexts/events-context';

export const metadata: Metadata = {
  title: 'CodePulse',
  description: 'Official website for the Cynergy Coding Club',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <AuthProvider>
          <EventsProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Header />
              <main className="flex-grow">{children}</main>
              <Toaster />
            </ThemeProvider>
          </EventsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
