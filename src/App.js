import React, { useState } from 'react';
import { Plus, Edit3, Trash2, ExternalLink, Save, X } from 'lucide-react';
import './App.css';

const TrainingTracksSystem = () => {
  const [tracks, setTracks] = useState([
    {
      id: 1,
      name: "Confidential Computing",
      color: "#4F46E5",
      stations: [
        {
          id: 1,
          name: "Introduction to Confidential Computing",
          description: "Understanding the fundamentals and why it matters",
          link: "https://example.com/intro-cc"
        },
        {
          id: 2,
          name: "Hardware Security Features",
          description: "Intel SGX, AMD SEV, and ARM TrustZone deep dive",
          link: "https://example.com/hardware-security"
        },
        {
          id: 3,
          name: "Attestation & Remote Verification",
          description: "Building trust in confidential environments",
          link: "https://example.com/attestation"
        }
      ]
    }
  ]);

  const [newTrackName, setNewTrackName] = useState('');
  const [editingStation, setEditingStation] = useState(null);
  const [editingTrack, setEditingTrack] = useState(null);

  const colors = ["#4F46E5", "#059669", "#DC2626", "#D97706", "#7C3AED", "#0891B2"];

  const createTrack = () => {
    if (!newTrackName.trim()) return;
    
    const newTrack = {
      id: Date.now(),
      name: newTrackName,
      color: colors[tracks.length % colors.length],
      stations: [
        {
          id: Date.now(),
          name: "Getting Started",
          description: "Begin your journey here",
          link: ""
        },
        {
          id: Date.now() + 1,
          name: "Destination",
          description: "You've mastered the fundamentals!",
          link: ""
        }
      ]
    };
    
    setTracks([...tracks, newTrack]);
    setNewTrackName('');
  };

  const deleteTrack = (trackId) => {
    setTracks(tracks.filter(track => track.id !== trackId));
  };

  const updateTrackName = (trackId, newName) => {
    setTracks(tracks.map(track => 
      track.id === trackId ? { ...track, name: newName } : track
    ));
    setEditingTrack(null);
  };

  const addStation = (trackId, afterIndex) => {
    const newStation = {
      id: Date.now(),
      name: "New Station",
      description: "Add your description here",
      link: ""
    };

    setTracks(tracks.map(track => {
      if (track.id === trackId) {
        const newStations = [...track.stations];
        newStations.splice(afterIndex + 1, 0, newStation);
        return { ...track, stations: newStations };
      }
      return track;
    }));

    setEditingStation({ trackId, stationId: newStation.id });
  };

  const updateStation = (trackId, stationId, updates) => {
    setTracks(tracks.map(track => {
      if (track.id === trackId) {
        return {
          ...track,
          stations: track.stations.map(station =>
            station.id === stationId ? { ...station, ...updates } : station
          )
        };
      }
      return track;
    }));
  };

  const deleteStation = (trackId, stationId) => {
    setTracks(tracks.map(track => {
      if (track.id === trackId) {
        return {
          ...track,
          stations: track.stations.filter(station => station.id !== stationId)
        };
      }
      return track;
    }));
  };

  const StationEditor = ({ station, trackId, onSave, onCancel }) => {
    const [name, setName] = useState(station.name);
    const [description, setDescription] = useState(station.description);
    const [link, setLink] = useState(station.link);

    const handleSave = () => {
      updateStation(trackId, station.id, { name, description, link });
      onSave();
    };

    return (
      <div className="bg-white p-4 rounded-lg border-2 border-blue-300 shadow-lg">
        <div className="space-y-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-sm font-medium"
            placeholder="Station name"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-sm resize-none"
            rows="2"
            placeholder="Brief description"
          />
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-sm"
            placeholder="https://..."
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
            >
              <Save size={14} />
              Save
            </button>
            <button
              onClick={onCancel}
              className="flex items-center gap-1 px-3 py-1 bg-gray-400 text-white rounded-md text-sm hover:bg-gray-500"
            >
              <X size={14} />
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🚊 Training Tracks</h1>
          <p className="text-gray-600">Your journey to technical mastery starts here</p>
        </div>

        {/* Create New Track */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Learning Track</h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={newTrackName}
              onChange={(e) => setNewTrackName(e.target.value)}
              placeholder="Enter track name (e.g., Virtualization, Azure Linux)"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && createTrack()}
            />
            <button
              onClick={createTrack}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus size={20} />
              Create Track
            </button>
          </div>
        </div>

        {/* Tracks */}
        <div className="space-y-8">
          {tracks.map((track) => (
            <div key={track.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Track Header */}
              <div 
                className="p-6 text-white relative"
                style={{ backgroundColor: track.color }}
              >
                <div className="flex justify-between items-center">
                  {editingTrack === track.id ? (
                    <input
                      type="text"
                      defaultValue={track.name}
                      className="bg-transparent border-b-2 border-white text-white placeholder-blue-100 text-2xl font-bold focus:outline-none"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          updateTrackName(track.id, e.target.value);
                        }
                      }}
                      onBlur={(e) => updateTrackName(track.id, e.target.value)}
                      autoFocus
                    />
                  ) : (
                    <h2 
                      className="text-2xl font-bold cursor-pointer hover:underline"
                      onClick={() => setEditingTrack(track.id)}
                    >
                      {track.name}
                    </h2>
                  )}
                  <button
                    onClick={() => deleteTrack(track.id)}
                    className="p-2 hover:bg-black hover:bg-opacity-20 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <div className="mt-2 flex items-center gap-4 text-sm opacity-90">
                  <span>🚩 Start</span>
                  <div className="flex-1 h-px bg-white opacity-30"></div>
                  <span>{track.stations.length} stations</span>
                  <div className="flex-1 h-px bg-white opacity-30"></div>
                  <span>🎯 Destination</span>
                </div>
              </div>

              {/* Track Stations */}
              <div className="p-6">
                <div className="relative">
                  {/* Track Line */}
                  <div 
                    className="absolute left-6 top-6 bottom-6 w-1 rounded-full"
                    style={{ backgroundColor: track.color }}
                  ></div>

                  {/* Stations */}
                  <div className="space-y-4">
                    {track.stations.map((station, index) => (
                      <div key={station.id} className="relative flex items-start gap-4">
                        {/* Station Dot */}
                        <div 
                          className="w-4 h-4 rounded-full border-4 border-white shadow-md z-10"
                          style={{ backgroundColor: track.color }}
                        ></div>

                        {/* Station Content */}
                        <div className="flex-1 min-w-0">
                          {editingStation?.trackId === track.id && editingStation?.stationId === station.id ? (
                            <StationEditor
                              station={station}
                              trackId={track.id}
                              onSave={() => setEditingStation(null)}
                              onCancel={() => setEditingStation(null)}
                            />
                          ) : (
                            <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors group">
                              <div className="flex justify-between items-start">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold text-gray-800">{station.name}</h4>
                                    {station.link && (
                                      <a
                                        href={station.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800"
                                      >
                                        <ExternalLink size={16} />
                                      </a>
                                    )}
                                  </div>
                                  <p className="text-gray-600 text-sm">{station.description}</p>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={() => setEditingStation({ trackId: track.id, stationId: station.id })}
                                    className="p-1 hover:bg-blue-100 rounded text-blue-600"
                                  >
                                    <Edit3 size={16} />
                                  </button>
                                  {track.stations.length > 2 && (
                                    <button
                                      onClick={() => deleteStation(track.id, station.id)}
                                      className="p-1 hover:bg-red-100 rounded text-red-600"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Add Station Button */}
                          {index < track.stations.length - 1 && (
                            <div className="flex justify-center mt-2">
                              <button
                                onClick={() => addStation(track.id, index)}
                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors flex items-center gap-1"
                              >
                                <Plus size={14} />
                                Add Station
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {tracks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tracks created yet. Start building your first learning journey!</p>
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <TrainingTracksSystem />
    </div>
  );
}

export default App;
