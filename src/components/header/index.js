import React from "react";
import { Link } from "react-router-dom";

import { Header as HeaderStyled } from "./styled";

export const Header = () => {
  return (
    <HeaderStyled>
      <div>
        <Link to="/main/1">Main</Link>
        <Link to="/favorites">Favorites</Link>
      </div>
    </HeaderStyled>
  );
};
