import './globals.css';
import Provider from './contexts/AuthContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body className=" bg-gray-100 dark:bg-gray-900">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
