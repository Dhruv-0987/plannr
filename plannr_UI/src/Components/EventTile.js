import React from "react";

function EventTile({ event }) {
    const [formattedDate, formattedTime] = event?.time.split('T');
  return (
    <div>
      <div className="bg-green-800 rounded-xl p-5 shadow-lg max-w-sm mx-auto text-white min-w-full min-h-full ">
        <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
        <p className="mb-4">{event.description}</p>
        <div className="flex items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a2 2 0 012-2h1a1 1 0 011 1v1h12a1 1 0 011-1h1a2 2 0 012 2v16a2 2 0 01-2 2h-1a1 1 0 01-1-1v-1H6a1 1 0 01-1 1H4a2 2 0 01-2-2V4z"
            />
          </svg>
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 12v.01M6 12a6 6 0 0011.928.993l1.086-.326A8 8 0 114 12h2zm10 0h2m-2 4l.879-.514a6.989 6.989 0 001.34-1.766l.621-.912a8.992 8.992 0 01-3.455 4.945L14 16zm0 0H10m4-4H10m4-4H10"
            />
          </svg>
          <span>{formattedTime}</span>
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 2C9.90814 2 7.88258 2.43788 6 3.196V7m0 4v10a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-6.5l-1 1H6z"
            />
          </svg>
          <span>{event.place}</span>
        </div>
      </div>
    </div>
  );
}

export default EventTile;
