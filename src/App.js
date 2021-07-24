import { useEffect, useState } from 'react';
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from './Spotify';
import SpotifyWebApi from "spotify-web-api-js";
import { useStateValue } from './StateProvider';
import Player from './Player';

function App() {
  const [{user,token},dispatch]=useStateValue();
  const spotify=new SpotifyWebApi();
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    if (_token) {
      dispatch({
         type:'SET_TOKEN',
         token:_token,
      })
      spotify.setAccessToken(_token);
      spotify.getMe().then((user)=>{
        dispatch({
          type:"SET_USER",
          user,
        })
      });
      spotify.getUserPlaylists().then((playlist)=>{
        dispatch({
          type:"SET_PLAYLISTS",
          playlists:playlist,
        })
      });
      spotify.getPlaylist("37i9dQZF1E34Ucml4HHx1w").then((playlist)=>{
        dispatch({
          type:"SET_DISCOVER_WEEKLY",
          discover_weekly:playlist,
        })
      })

    }

    console.log("token", token);
  }, []);
  return (
    <div className="App">
      {token ? <Player spotify={spotify} /> : 
        <Login /> }
    </div>
  );
}

export default App;
