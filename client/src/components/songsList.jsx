import { Navigate, useNavigate } from "react-router-dom"
import styles from "./styles/songlist.css"
function SongList(){
    const navigate = useNavigate()
    return (
        <div className={styles.container}>
            <h1>Songs List</h1>
            <div className={styles.actionButtons}>
                <button className="add-artist" onClick={() =>navigate("/addArtist")}>Add Artist</button>
                <button className="add-lyrics" onClick={() =>navigate("addLyrics")}>Add Lyrics</button>
            </div>
        </div>
    )
}
export default SongList