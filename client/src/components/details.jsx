import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSongById } from "../api/songsApi";

function Details(){
    const [song, setSong] = useState(null)
    const id = useParams();
    const navigate = useNavigate()
    useEffect(() =>{
        const fetchSong = async () =>{
            const data = await getSongById(id)
            setSong(data)
        }
        fetchSong()
    }, [id])
    if(!song) return <p>Loading ...</p>
    const Lyrics = song.LyricsContents?.[0] || {}
    return (
         <div className="container">
      <h2>{lyrics.title}</h2>
      <p><b>Category:</b> {song.Category}</p>
      <p><b>Language:</b> {song.language}</p>
      <p><b>Chorus:</b> {lyrics.chorus}</p>
      <p><b>Verse 1:</b> {lyrics.verse1}</p>
      <p><b>Verse 2:</b> {lyrics.verse2}</p>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
    )
}
export default Details
