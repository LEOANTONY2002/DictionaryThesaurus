import React from "react";
import icon from "../LA.jpg";
import HistoryIcon from "@material-ui/icons/History";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <Link to="/">
        <img className="icon" src={icon} alt="LA" />
      </Link>
      <div style={{ margin: "5%", display: "flex", alignItems: "center" }}>
        <Link to="/history">
          <HistoryIcon
            fontSize="large"
            style={{ color: "blue", marginRight: "7px" }}
          />
        </Link>
        <Link to="/favs">
          <FavoriteBorderIcon
            fontSize="large"
            style={{ color: "blue", marginRight: "7px" }}
          />
        </Link>
      </div>
    </div>
  );
}

export default Header;
