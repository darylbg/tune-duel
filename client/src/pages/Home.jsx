import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div>
        <h1>Tune Duel</h1>
        <h4>Choose a game to play</h4>
      </div>
      <div>
        <Link to="/ListenCountGame">ListenCountGame</Link>
      </div>
      <div>
        <Link to="/TrackRecognitionGame">TrackRecognitionGame</Link>
      </div>
      <div>
        <Link to="/AlbumArtGame">AlbumArtGame</Link>
      </div>
    </div>
  );
}
