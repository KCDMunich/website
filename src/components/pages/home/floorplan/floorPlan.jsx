import React from 'react';
import { Tooltip } from 'react-tooltip';

const FloorPlanViewer = ({ imageUrl, areas }) => {
  return (
    <div className="w-full">
      <div className="relative" style={{ paddingBottom: '75%' }}>
        <img
          src={imageUrl || '/placeholder.svg'}
          alt="Floor Plan"
          className="absolute left-0 top-0 h-full w-full object-contain"
        />
        {areas.map((area) => (
          <div
            key={area.id}
            data-tooltip-id={area.id}
            className="absolute cursor-pointer transition-opacity duration-200"
            style={{
              left: `${area.coordinates.x}%`,
              top: `${area.coordinates.y}%`,
              width: `${area.coordinates.width}%`,
              height: `${area.coordinates.height}%`,
              backgroundColor: area.color,
              opacity: 0.3,
            }}
          />
        ))}

        {/* Tooltips for each area */}
        {areas.map((area) => (
          <Tooltip
            key={area.id}
            id={area.id}
            place="top"
            className="z-50 max-w-xs rounded-lg !bg-white !text-gray-800 shadow-lg"
          >
            <div className="p-2">
              <h3 className="mb-1 font-bold">{area.title}</h3>
              <p>{area.description}</p>
            </div>
          </Tooltip>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4">
        <h3 className="mb-2 text-xl font-bold">Legende</h3>
        <div className="grid grid-cols-2 gap-2">
          {areas.map((area) => (
            <div key={area.id} className="flex items-center">
              <div className="mr-2 h-4 w-4" style={{ backgroundColor: area.color }} />
              <span>{area.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Sample data for the ground floor
const groundFloorAreas = [
  {
    id: 'area1',
    title: 'Haupteingang',
    description: 'Der Haupteingang des Gebäudes mit Empfangsbereich',
    coordinates: {
      x: 20,
      y: 30,
      width: 15,
      height: 15,
    },
    color: '#FF9999',
  },
  {
    id: 'area2',
    title: 'Foyer',
    description: 'Großzügiger Empfangsbereich',
    coordinates: {
      x: 35,
      y: 30,
      width: 30,
      height: 20,
    },
    color: 'red',
  },
  {
    id: 'area3',
    title: 'Aufzüge',
    description: 'Aufzüge zu den oberen Etagen',
    coordinates: {
      x: 70,
      y: 35,
      width: 10,
      height: 10,
    },
    color: '#9999FF',
  },
];

// Sample data for the first floor
const firstFloorAreas = [
  {
    id: 'champagnerBar',
    title: 'Champagner Bar',
    description: 'Exklusive Bar mit großer Getränkeauswahl',
    coordinates: {
      x: 40,
      y: 35,
      width: 10,
      height: 10,
    },
    color: '#FFFF99',
  },
  {
    id: 'konferenzraum',
    title: 'Konferenzraum',
    description: 'Großer Konferenzraum für Meetings und Präsentationen',
    coordinates: {
      x: 55,
      y: 30,
      width: 20,
      height: 15,
    },
    color: '#FF99FF',
  },
  {
    id: 'lounge',
    title: 'Lounge',
    description: 'Komfortable Sitzecke zum Entspannen',
    coordinates: {
      x: 20,
      y: 50,
      width: 25,
      height: 20,
    },
    color: '#99FFFF',
  },
];

const FloorPlan = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-12 p-4">
      {/* Ground Floor */}
      <section>
        <h2 className="mb-6 text-3xl font-bold">Erdgeschoss</h2>
        <FloorPlanViewer
          imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smartvillage_bogenhausen_smartcafe_raumplan_leer-wEOyet1DfCGY1iQhLSmTnYWPUKMI82.png"
          areas={groundFloorAreas}
        />
      </section>

      {/* 1st Floor */}
      <section>
        <h2 className="mb-6 text-3xl font-bold">1. Obergeschoss</h2>
        <FloorPlanViewer
          imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smartvillage-bogenhausen-flur1.og-etagen.plan-OEoxWSGkpXTrN8FEC4GQAL1JaeXObn.png"
          areas={firstFloorAreas}
        />
      </section>
    </div>
  );
};

export default FloorPlan;
