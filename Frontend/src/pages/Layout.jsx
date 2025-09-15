import React from 'react'
import Sidebar from '../component/Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-65 text-white">
        <Sidebar />
      </div>

      {/* Content */}
      <main className="flex-1 p-8 bg-gray-400 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export default Layout;
