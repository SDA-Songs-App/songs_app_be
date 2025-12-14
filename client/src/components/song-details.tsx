import axios from "axios";
import { useParams } from "react-router-dom";

 function SongDetails() {
  const { id } = useParams();

  // fetch from backend using the id
   axios.get(`/lyrics/${id}`)

  return (
    <div>
      <h1>Song Details</h1>
      <p>Song ID: {id}</p>
    </div>
  );
}
export default SongDetails
