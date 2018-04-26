import React from "react";
import Menu from "./Menu";
import Lecteur from "./Lecteur";

const Header = (props) => (
  <header>
    <Menu />
    <Lecteur />
  </header>
);

export default Header;