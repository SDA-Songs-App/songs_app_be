import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./styles/songlist.css";

function SongList() {
  const navigate = useNavigate();

  // All songs (sample)
  const allSongs = [
    { id: 1, title: "አመሰኛለሁ", artist: "አላሙራ ኳር", language: "አማርኛ", deletedAt: null },
    { id: 2, title: "መገኖ ገለተ", artist: "ተፈራ ወ/ማሪያም", language: "ሲዳምኛ", deletedAt: new Date("2025-12-01")  },
    { id: 3, title: "ከእ", artist: "አለሙ", language: "ጉራጊኛ", deletedAt: null },
    { id: 4, title: "ጡሚን ቆረብ ኬእ", artist: "በረከት ዮሃንስ", language: "ከምባትኛ", deletedAt: null },
    { id: 5, title: "ምስገአና", artist: "ኪሮስ", language: "ትግርኛ" , deletedAt: new Date("2025-12-01") },
  ];

  // Filters
  const [selectedLang, setSelectedLang] = useState("");
  const [selectedArtist, setSelectedArtist] = useState("");
  // Dashboard stats
  const stats = [
    { title: "Total Songs", value: allSongs.length, icon: "🎵" },
    { title: "Active Songs", value: 14, icon: "🎵" },
    { title: "Total Artists", value: 32, icon: "👤" },
    { title: "Total Albums", value: 56, icon: "💿" },
  ];

  // Filter logic
 const filteredSongs = allSongs.filter(song => {
  return (
    (selectedLang === "" || song.language === selectedLang) &&
    (selectedArtist === "" || song.artist === selectedArtist)
  );
});

  // Create dropdown lists without duplicates
  const languages = [...new Set(allSongs.map(song => song.language))];
  const artists = [...new Set(allSongs.map(song => song.artist))];
const [songs, setSongs] = useState(allSongs);

const handleDelete = (id: number) => {
  const confirmed = window.confirm("Are you sure you want to delete this song?");
  if (!confirmed) return;

  const updated = songs.filter(song => song.id !== id);
  setSongs(updated);
};

  const handleToggleStatus = (id: number) => {
    setSongs(prev =>
      prev.map(song =>
        song.id === id
          ? { ...song, deletedAt: song.deletedAt ? null : new Date() }
          : song
      )
    );
  };
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">🎵 Songs Dashboard</h1>

      {/* Buttons */}
      <div className="button-group">
        <button className="add-button" onClick={() => navigate("/addArtist")}>
          ➕ Add Artist
        </button>

        <button className="add-button" onClick={() => navigate("/addLyrics")}>
          ➕ Add Lyrics
        </button>

        <button className="add-button" onClick={() => navigate("/addAlbum")}>
          ➕ Add Album
        </button>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-grid">
        {stats.map((item, index) => (
          <div key={index} className="dashboard-card">
            <div className="card-icon">{item.icon}</div>
            <div className="card-info">
              <h2>{item.value}</h2>
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="filters-container">
        <select
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          className="filter-input"
        >
          <option value="">Filter by Language</option>
          {languages.map((lang, i) => (
            <option key={i} value={lang}>{lang}</option>
          ))}
        </select>

        <select
          value={selectedArtist}
          onChange={(e) => setSelectedArtist(e.target.value)}
          className="filter-input"
        >
          <option value="">Filter by Artist</option>
          {artists.map((artist, i) => (
            <option key={i} value={artist}>{artist}</option>
          ))}
        </select>
      </div>
      {/* Songs Table */}
  <table className="songs-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Song Title</th>
            <th>Artist</th>
            <th>Language</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {songs.map(song => (
            <tr
              key={song.id}
              className={song.deletedAt ? "deactivated-row" : ""}
            >
              <td>{song.id}</td>
              <td>{song.title}</td>
              <td>{song.artist}</td>
              <td>{song.language}</td>
              <td>{song.deletedAt ? "Inactive" : "Active"}</td>
              <td className="actions-cell">
                {!song.deletedAt && (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/editSong/${song.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="deactivate-btn"
                      onClick={() => handleToggleStatus(song.id)}
                    >
                      Deactivate
                    </button>
                  </>
                )}

                {song.deletedAt && (
                  <button
                    className="activate-btn"
                    onClick={() => handleToggleStatus(song.id)}
                  >
                    Activate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SongList;