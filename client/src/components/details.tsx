import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../auth/auth-context";
import './styles/details.css'
interface LyricsContent {
  Id: number;
  title: string;
  chorus: string | null;
  verse1: string | null;
  verse2: string | null;
  verse3: string | null;
  verse4: string | null;
  verse5: string | null;
}

interface Artist {
  Id: number;
  name: string;
}

interface Song {
  Id: number;
  Category: string;
  language: string;
  deletedAt: string | null;
  LyricsContents: LyricsContent[];
  Artist: Artist | null;
}

function Details() {
  const { id } = useParams<{ id: string }>();
  const auth = useContext(AuthContext);
  const [song, setSong] = useState<Song | null>(null);

  useEffect(() => {
    const fetchSong = async () => {
      if (!id) return;
      try {
        const res = await fetch(`https://sda-songs-be.onrender.com/lyrics/${id}`, {
          headers: { Authorization: `Bearer ${auth?.token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch song");
        const data: Song = await res.json();
        setSong(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSong();
  }, [id, auth?.token]);

  if (!song) return <p>Loading...</p>;
const updateLyricStatus = async (lyricId: number, status: "APPROVED" | "REJECTED") => {
  try {
    const res = await fetch(`https://sda-songs-be.onrender.com/lyrics/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth?.token}`,
      },
      body: JSON.stringify({ lyricId, status }),
    });
    if (!res.ok) throw new Error("Failed to update status");

    setSong(prev => prev ? {
      ...prev,
      LyricsContents: prev.LyricsContents.map(lc =>
        lc.Id === lyricId ? { ...lc, status } : lc
      )
    } : prev);
  } catch (err) {
    console.error(err);
  }
};
console.log("song details", song)
  return (
    <div className="details-container">
  

  <div className="lyrics-list">
    
    {song.LyricsContents.map((lc) => (
      <div className="lyrics-card" key={lc.Id}>
      
    
    <div className="details-info">
      <h3><strong>Title:</strong> {song.LyricsContents[0]?.title}</h3>
      <p><strong>Artist:</strong> {song.Artist?.name || "N/A"}</p>
      <p><strong>Category:</strong> {song.Category}</p>
      <p><strong>Language:</strong> {song.language}</p>
      <p><strong>Status:</strong> {song.deletedAt ? "Inactive" : "Active"}</p>
    </div>
        {lc.chorus && <div><strong>Chorus:</strong> {lc.chorus.split("\n").map((line, index) =>(<p className="verse-line" key =  {index}>{line.trim()}</p>))}</div>}
        {lc.verse1 && <p><strong>verse1:</strong>{lc.verse1.split("\n").map((line, index) =>(<p className="verse-line" key =  {index}>{line.trim()}</p>))}</p>}
        {lc.verse2 && <p><strong>verse2:</strong>{lc.verse2.split("\n").map((line, index) =>(<p className="verse-line" key =  {index}>{line.trim()}</p>))}</p>}
        {lc.verse3 && <p><strong>Verse3:</strong>{lc.verse3.split("\n").map((line, index) =>(<p className="verse-line" key =  {index}>{line.trim()}</p>))}</p>}
        {lc.verse4 && <p><strong>Verse4:</strong>{lc.verse4.split("\n").map((line, index) =>(<p className="verse-line" key =  {index}>{line.trim()}</p>))}</p>}
        {lc.verse5 && <p><strong>Verse5:</strong>{lc.verse5.split("\n").map((line, index) =>(<p className="verse-line" key =  {index}>{line.trim()}</p>))}</p>}
        <div className="action-buttons">
              <button
                className="approve-btn"
                onClick={() => updateLyricStatus(lc.Id, "APPROVED")}
              >
                Approve
              </button>
              <button
                className="reject-btn"
                onClick={() => updateLyricStatus(lc.Id, "REJECTED")}
              >
                Reject
              </button>
            </div>
      </div>
    ))}
  </div>
</div>

  );
}

export default Details;
