import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";

function Fav() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    setWords(JSON.parse(localStorage.getItem("favs")));
  }, []);

  return (
    <div className="fav">
      <h1 style={{ background: "transparent" }}>Favourites</h1>
      <div style={{ background: "transparent", margin: "7px 5px" }}>
        {words?.map((w) => (
          <p
            style={{
              background: "transparent",
              border: "1px solid black",
              borderRadius: "2px",
              boxShadow: "0 0 3px 1px black",
              padding: "3px",
              margin: "10px",
              width: "max-content",
            }}
          >
            {w?.word}
          </p>
        ))}
      </div>
      <Link to="/">
        <HomeIcon
          fontSize="large"
          style={{
            color: "rgb(179, 132, 14)",
            background:
              "-webkit-linear-gradient(rgb(12, 5, 110), rgb(16, 6, 59), black)",
            borderRadius: "50%",
            padding: "5px",
            boxShadow: "0 0 10px 2px blue ",
            position: "fixed",
            bottom: "60px",
            left: "25px",
          }}
        />
      </Link>
      {!words && (
        <p style={{ background: "transparent", color: "grey" }}>
          No Words...!
          <br />
          Add your favourite words
        </p>
      )}
    </div>
  );
}

export default Fav;
