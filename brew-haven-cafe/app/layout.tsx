import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Brew Haven Café - Premium Coffee & Handcrafted Momos',
  description: 'Experience luxury cafe culture with premium coffee, handcrafted momos, and nature-inspired ambiance. Reserve a table or order online today.',
  keywords: 'cafe, coffee, momos, premium coffee, handcrafted food, reservation',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://brewhavencafe.com',
    title: 'Brew Haven Café',
    description: 'Where Every Sip & Every Bite Feels Like Home',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2d5016" />
      </head>
      <body>
        {children}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
