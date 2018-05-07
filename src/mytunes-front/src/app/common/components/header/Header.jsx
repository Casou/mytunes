import React from "react";
import Menu from "./Menu";
import LecteurContainer from "./LecteurContainer";

import PlaylistMenu from "../playlist/PlaylistMenu";

const Header = (props) => (
  <header>
    <Menu />
    <LecteurContainer />
    <PlaylistMenu />
  </header>
);

export default Header;