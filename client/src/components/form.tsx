import React, { useEffect, useState } from "react";
import "./form.css";
import CATEGORIES from "../constants/Categories"

import LyricsContent from "../constants/LyricsContent";
import axios from "axios"
import LANGUAGES from "../constants/languages";
type CreateLyricsForm = {
  albumId: number;
  artistId: number;
  audioFileUrl: string;
  language: string;
  category: string;
  contents: LyricsContent[];
};
type Artist = {
  Id:number,
  name:string,
  genre:string,
  imageUrl:string;
  createdAt:string,
  deletedAt:string
}
type Album ={
  Id:number,
  title: string,
  artistId: number | "",
  releaseDate: string,
  coverImageUrl: string
}

const SongForm =  () => {
  const [artists, setArtists] = useState<Artist[]>([])
  const [albums, setAlbums] = useState<Album[]>([]);
  const [formData, setFormData] = useState<CreateLyricsForm>({
    language: "",
    artistId: 0,
    albumId:0,
    audioFileUrl:'',
    category: "",
    contents:[
                {
                    title:'', 
                    chorus:'',
                    verse1:'',
                    verse2:'',
                    verse3:'',
                    verse4:'',
                    verse5:'',
                    verse6:'',
                }
    ],
  });
useEffect(() =>{
   axios
   
         .get("http://127.0.0.1:3001/artists")
         .then((res) =>setArtists(res.data))
         .catch((err) =>console.error(err))
    axios
          .get("http://127.0.0.1:3001/albums")
          .then((res) =>setAlbums(res.data))
          .catch((err) =>console.error(err))
},[])
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  index?: number,
  field?: keyof LyricsContent
) => {
  const { name, value, type, files } = e.target as HTMLInputElement;

  // Update lyrics content if index and field are provided
  if (index !== undefined && field) {
    setFormData(prev => {
      const updatedContents = [...prev.contents];
      updatedContents[index] = {
        ...updatedContents[index],
        [field]: value,
      };
      return { ...prev, contents: updatedContents };
    });
  } else {
    // Handle file input
    if (type === "file" && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          audioFileUrl: reader.result as string, // base64 string
        }));
      };
      reader.readAsDataURL(file);
    } else {
      // Update top-level non-file fields
      setFormData(prev => ({
        ...prev,
        [name]: name === "artistId" || name === "albumId" ? Number(value) : value,
      }));
    }
  }
};


  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  
  if(!formData.albumId || !formData.artistId || !formData.language || !formData.category) {
    alert("Please fill all required fields")
    return
  }
  if (formData.albumId === 0 || formData.artistId === 0 || !formData.language || !formData.category || !formData.contents[0].title) {
  alert("Please fill all required fields including the song title.");
  return;
}
  try{
    const payload ={
      ...formData, 
      artistId:Number(formData.artistId),
      albumId:Number(formData.albumId)
    }
  
  const response = await axios.post("http://127.0.0.1:3001/lyrics", payload)
  console.log("Lyrics created", response.data)

  setFormData({
       albumId: 0,
        artistId: 0,
        audioFileUrl: "",
        language: "",
        category: "",
        contents: [
          {
            title: "",
            chorus: "",
            verse1: "",
            verse2: "",
            verse3: "",
            verse4: "",
            verse5: "",
            verse6: "",
          },
        ],
      });
  }
  catch (error: any) {
  console.error("Full Axios error:", error);                 // Logs the entire Axios error object
  console.error("Backend response:", error.response?.data);  // Logs what the backend returned
  alert("Failed to create lyrics. Check console for details.");
}
 }
  return (
    <div className="form-container">
      <h2>Add New Lyrics</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input 
          type="text" 
          value={formData.contents[0].title}
          onChange={(e) =>handleChange(e, 0, "title")} />

        <label>Artist</label>
<select 
      name="artistId" 
      value={formData.artistId || ""}
      onChange={handleChange}
      >
  <option 
       value="">Select Artist</option>
       {artists.map((artist) => (
    <option key={artist.Id} value={artist.Id}>
      {artist.name}
    </option>
  ))}
</select>
 {/* Album */}
        <label>Album</label>
        <select
          name="albumId"
          value={formData.albumId || ""}
          onChange={handleChange}
          required
        >
          <option value="">Select Album</option>
          {albums.map((album) => (
            <option key={album.Id} value={album.Id}>
              {album.title}
            </option>
          ))}
        </select>
<label>Category</label>
        <select name="category" onChange={handleChange}>
  <option value="">Select Category</option>
  {Object.values(CATEGORIES).map((cat) => (
    <option key={cat} value={cat}>
      {cat.replace("_", " ")}
    </option>
  ))}
</select>
    <label>Audio File</label>
    <input 
      type="file" 
      
      name="audioFileUrl" 
      accept = "audio/*"
      onChange={handleChange} 
    />
        <label>Language</label>
        <select name="language" onChange={handleChange}>
          <option value="">Select Language</option>
          {Object.keys(LANGUAGES)
          .filter(cat=>isNaN(Number(cat)))
           .map((lang)=>(
                <option key={lang} value={lang}>
                   {lang.replace(/_/g, " ")} 
                   </option>
              ))}                        
        </select>
        <label>Chorus</label>
        <textarea 
          value={formData.contents[0].chorus}
          onChange={(e)=>handleChange(e, 0, "chorus")}>
        </textarea>
        <label>Verse 1</label>
        <textarea 
          name="verse1" 
          value={formData.contents[0].verse1}
          onChange={(e)=>handleChange(e, 0, "verse1")}>
        </textarea>
        <label>Verse 2</label>
        <textarea 
          value={formData.contents[0].verse2}
          onChange={(e)=>handleChange(e, 0, "verse2")}>
        </textarea>

        <label>Verse 3</label>
        <textarea 
          value={formData.contents[0].verse3}
          onChange={(e)=>handleChange(e, 0, "verse3")}>
        </textarea>

        <label>Verse 4</label>
        <textarea 
          value={formData.contents[0].verse4}
          onChange={(e)=>handleChange(e, 0, "verse4")}>
        </textarea>

        <label>Verse 5</label>
        <textarea 
          value={formData.contents[0].verse5}
          onChange={(e)=>handleChange(e, 0, "verse5")}>
        </textarea>
        <label>Verse 6</label>
        <textarea 
          value={formData.contents[0].verse6}
          onChange={(e)=>handleChange(e, 0, "verse6")}>
        </textarea>
        <button type="submit">Save Lyrics</button>
      </form>
    </div>
  );
};

export default SongForm;
