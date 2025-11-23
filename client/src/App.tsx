import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Form, Route, Routes } from 'react-router-dom';
import SongList from './components/songsList'
import SongForm from './components/form'
import ArtistForm from './components/formArtist';
function App() {
  return (
    <Routes>
      <Route path="/" element={<SongList />} />
      <Route path='/addLyrics' element = {<SongForm/>}></Route>
      <Route path='/addArtist' element ={<ArtistForm />}> </Route>
    </Routes>
   
  );
}

export default App;
