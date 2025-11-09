import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Form, Route, Routes } from 'react-router-dom';
import SongList from './components/songsList'
import SongForm from './components/form'
function App() {
  return (
    <Routes>
      <Route path='/add' element = {<Form/>}></Route>
    </Routes>
   
  );
}

export default App;
