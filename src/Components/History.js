import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import HomeIcon from "@material-ui/icons/Home";

function History() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    setWords(JSON.parse(localStorage?.getItem("words")));
  }, [words]);

  const del = () => {
    localStorage.removeItem("words");
  };

  return (
    <div className="history">
      <h1 style={{ background: "transparent" }}>History</h1>
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
            background:
              "-webkit-linear-gradient(rgb(110, 5, 110), rgb(59, 6, 59), black)",
            color: "rgb(179, 132, 14)",
            borderRadius: "50%",
            padding: "5px",
            boxShadow: "0 0 10px 2px rgb(110, 5, 110) ",
            position: "fixed",
            bottom: "60px",
            left: "25px",
          }}
        />
      </Link>
      <DeleteIcon
        onClick={del}
        fontSize="large"
        style={{
          background:
            "-webkit-linear-gradient(rgb(110, 5, 110), rgb(59, 6, 59), black)",
          color: "rgb(179, 132, 14)",
          borderRadius: "50%",
          padding: "5px",
          boxShadow: "0 0 10px 2px rgb(110, 5, 110) ",
          position: "fixed",
          bottom: "60px",
          right: "25px",
        }}
      />
    </div>
  );
}

export default History;
