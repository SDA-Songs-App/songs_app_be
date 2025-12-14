import React from "react";
import { Routes, Route } from "react-router-dom";
import SongList from "./components/songsList";
import SongForm from "./components/form";
import ArtistForm from "./components/formArtist";
import AlbumForm from "./components/form-album";
import Login from "./components/login";
import ProtectedRoute from "./components/ProtectedRoute";
import Details from "./components/details";

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <SongList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/addLyrics"
        element={
          <ProtectedRoute>
            <SongForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/addArtist"
        element={
          <ProtectedRoute>
            <ArtistForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/addAlbum"
        element={
          <ProtectedRoute>
            <AlbumForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lyrics/:id"
        element={
          <ProtectedRoute>
            <Details />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
