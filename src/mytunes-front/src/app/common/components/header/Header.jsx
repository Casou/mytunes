import React from "react";
import Menu from "./Menu";
import LecteurContainer from "./LecteurContainer";

import PlaylistMenu from "../playlist/container/PlaylistMenu";

const Header = () => (
  <header>
    <Menu />
    <LecteurContainer />
    <PlaylistMenu />
  </header>
);

export default Header;