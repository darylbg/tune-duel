import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListenCountGame from "./pages/ListenCountGame";
import TrackRecognitionGame from "./pages/TrackRecognitionGame";
import AlbumArtGame from "./pages/AlbumArtGame";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="ListenCountGame" element={<ListenCountGame />} />
        <Route path="TrackRecognitionGame" element={<TrackRecognitionGame />} />
        <Route path="AlbumArtGame" element={<AlbumArtGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
