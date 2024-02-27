// layout.tsx
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <header className="bg-green text-white w-full p-4 fixed top-0 left-0">
        <div className="max-w-screen-xl px-4">
          <h1>NinerRate</h1>
        </div>
      </header>
      <main className="pt-16 p-4">{children}</main>{' '}
    </>
  );
};

export default Layout;
