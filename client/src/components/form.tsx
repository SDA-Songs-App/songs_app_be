import React, { useEffect, useState } from "react";
import "./form.css";
import CATEGORIES from "../constants/Categories"
import ARTISTS from "../constants/artists";
import LyricsContent from "../constants/LyricsContent";
import axios from "axios"
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

const SongForm = () => {
  const [artists, setArtists] = useState<Artist[]>([])
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
   axios.get("http://127.0.0.1:3001/artists")
         .then((res) =>setArtists(res.data))
         .catch((err) =>console.error(err))
},[])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, index?: number, field?: keyof LyricsContent) => {
    if (index !== undefined && field) {
      const updatedContents = [...formData.contents];
      updatedContents[index][field] = e.target.value;
      setFormData({ ...formData, contents: updatedContents });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  return (
    <div className="form-container">
      <h2>Add New Lyrics</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input 
          type="text" 
          name="title" 
          value={formData.contents[0].title}
          onChange={handleChange} />

        <label>Artist</label>
<select name="artistId" onChange={handleChange}>
  <option value="">Select Artist</option>
  {artists.map((artist) => (
    <option key={artist.Id} value={artist.Id}>
      {artist.name}
    </option>
  ))}
</select>
        <select name="category" onChange={handleChange}>
  <option value="">Select Category</option>
  {Object.values(CATEGORIES).map((cat) => (
    <option key={cat} value={cat}>
      {cat.replace("_", " ")}
    </option>
  ))}
</select>
        <label>Language</label>
        <select name="language" onChange={handleChange}>
          <option value="">Select Language</option>
          <option value="ENGLISH">English</option>
          <option value="AMHARIC">Amharic</option>
          <option value="OROMO">Oromo</option>
        </select>

        <label>Chorus</label>
        <textarea name="chorus" onChange={handleChange}></textarea>

        <label>Verse 1</label>
        <textarea name="verse1" onChange={handleChange}></textarea>

        <label>Verse 2</label>
        <textarea name="verse2" onChange={handleChange}></textarea>

        <label>Verse 3</label>
        <textarea name="verse3" onChange={handleChange}></textarea>

        <label>Verse 4</label>
        <textarea name="verse4" onChange={handleChange}></textarea>

        <label>Verse 5</label>
        <textarea name="verse5" onChange={handleChange}></textarea>

        <button type="submit">Save Lyrics</button>
      </form>
    </div>
  );
};

export default SongForm;
