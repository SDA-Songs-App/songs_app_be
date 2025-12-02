import { useNavigate } from "react-router-dom"
import "./styles/songlist.css"
function SongList(){
    const navigate = useNavigate()
    return (
        <div className= "container">
            <h1>Songs List</h1>
            <div className= "actionButtons">
                <button className="add-artist" onClick={() =>navigate("/addArtist")}>Add Artist</button>
                <button className="add-lyrics" onClick={() =>navigate("addLyrics")}>Add Lyrics</button>
                <button className="add-album" onClick={() =>navigate("/addAlbum")}>Add Album</button>
            </div>
        </div>
    )
}
export default SongList