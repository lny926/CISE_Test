"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const ModeratorDashboard = () => {
  const router = useRouter();

  return (
    <div style={{ padding: '20px' }}>
      <h1 className="text-4xl font-bold text-black mb-10">Moderator dashboard</h1>

      {/* Back button to return to the Admin Dashboard */}
      <button
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-gray-200 text-black gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        onClick={() => router.push('/moderatordashboard')}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default ModeratorDashboard;
