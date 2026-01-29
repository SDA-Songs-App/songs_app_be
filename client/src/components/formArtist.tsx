import React, { useState } from "react";
import axios from "axios";
import "./form.css";

type CreateArtistForm = {
  name: string;
  genre: string;
  bio: string;
  imageUrl: string;
};

const ArtistForm = () => {
  const [formData, setFormData] = useState<CreateArtistForm>({
    name: "",
    genre: "",
    bio: "",
    imageUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://sda-songs-be.onrender.com/artists",
        formData
      );
      console.log("Artist created:", response.data);
      // Reset form
      setFormData({ name: "", genre: "", bio: "", imageUrl: "" });
    } catch (error) {
      console.error("Error creating artist:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Artist</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Genre</label>
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        />

        <label>Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        ></textarea>

        <label>Image URL</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
        />

        <button type="submit">Save Artist</button>
      </form>
    </div>
  );
};

export default ArtistForm;
