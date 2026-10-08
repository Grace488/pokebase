import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg animate-pulse w-full max-w-sm mx-auto">
      <div className="h-48 bg-gray-300 dark:bg-gray-700 w-full"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-16"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-16"></div>
        </div>
        <div className="flex justify-between items-center mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
