import React, { useEffect, useState } from 'react';

const scriptUrl = 'https://sessionize.com/api/v2/cos5nif6/view/GridSmart';
const sessionListUrl = 'https://sessionize.com/api/v2/t71l7ld5/view/Sessions';

const Schedule = () => {
  return (
    <section className="safe-paddings relative bg-white pb-40 lg:pb-32 md:py-24 sm:py-16">
      <div className="container flex justify-between lg:flex-col">
        <div className="text-primary-1 lg:flex lg:flex-col lg:items-center lg:justify-center lg:text-center">
          <br />
          <SessionListComponent />
        </div>
      </div>
    </section>
  );
};

const SessionListComponent = () => {
  const [sessionData, setSessionData] = useState([]);

  useEffect(() => {
    fetch(scriptUrl)
      .then((response) => response.json())
      .then((data) => setSessionData(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2">
      {sessionData[0]?.sessions.map((session) => (
        <div key={session.id} className="bg-gray-100 rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-semibold">{session.title}</h2>
          <p className="text-gray-500">{session.description}</p>
          <p className="mt-2">Speaker: {session.speakers[0]?.name}</p>
          <p>Status: {session.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Schedule;
