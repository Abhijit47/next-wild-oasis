import type { Metadata } from 'next';
import { Poppins, Sono } from 'next/font/google';
import Navbar from './_components/Navbar';
// import { DarkModeProvider } from './_contexts';
import 'react-day-picker/dist/style.css';
import { Toaster } from 'sonner';
import { ReservationProvider } from './_contexts/ReservationContext';
import ThemeProvider from './_providers/ThemeProvider';
import './globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const sono = Sono({
  variable: '--font-sono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s - The Wild Oasis',
    default: 'Welcome, The Wild Oasis',
  },
  description:
    'Luxurious cabin hotel, located in the heart of the italian Dolomites, surrounded by beautiful mountains and dark forests',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${sono.variable} antialiased relative min-h-screen`}>
        <ThemeProvider>
          <Navbar />
          <ReservationProvider>
            {children}
            {/* <div className={'flex-1 px-8 py-12 grid'}>{children}</div> */}
          </ReservationProvider>
        </ThemeProvider>
        {/* <Script src='/noflash.js' strategy='beforeInteractive' /> */}
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}
