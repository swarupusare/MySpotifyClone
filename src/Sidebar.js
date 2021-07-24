import React from 'react'
import SidebarOption from './SidebarOption';
import { useStateValue } from './StateProvider';
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import { LibraryMusic } from "@material-ui/icons";
import "./Sidebar.css";
function Sidebar() {
    const [{playlists},dispatch]=useStateValue();

    return (
      <div className="sidebar">
        <img
           className="sidebar__logo"
           src="https://music-b26f.kxcdn.com/wp-content/uploads/2017/06/635963274692858859903160895_spotify-logo-horizontal-black.jpg"
           alt="Spotify logo"
        />

        <SidebarOption title="Home" Icon={HomeIcon} />
        <SidebarOption title="Search" Icon={SearchIcon} />
        <SidebarOption title="Your Library" Icon={LibraryMusic} />
        <br />
        <strong className="sidebar__title">PLAYLISTS</strong>
        <hr />
        {playlists?.items?.map((playlist) => (
          <SidebarOption title={playlist.name} />
        ))}
      </div>
    )
}

export default Sidebar;
