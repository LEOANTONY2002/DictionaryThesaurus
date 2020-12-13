import React, { useEffect, useState } from "react";
import "./Main.css";
import "../App.css";
import VolumeUpOutlinedIcon from "@material-ui/icons/VolumeUpOutlined";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import axios from "../axios";
import axiosThes from "../axiosThes";

function Dict() {
  const [word, setWord] = useState("happy");
  const [respData, setRespData] = useState([]);
  const [syn, setSyn] = useState([]);
  const [ant, setAnt] = useState([]);
  const [def, setDef] = useState(true);
  const [thes, setThes] = useState(false);
  const [isSyn, setIsSyn] = useState(true);
  const [isAnt, setIsAnt] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(async () => {
    setErr(false);
    setIsFav(false);

    const resp = await axios
      .get(`/${word.toLowerCase()}`)
      .catch(() => setErr(true));
    setRespData(resp?.data);

    const the = await axiosThes
      .get(`/${word.toLowerCase()}`)
      .catch(() => setErr(true));
    setSyn(the?.data[0]?.meta?.syns);
    setAnt(the?.data[0]?.meta?.ants);
  }, [word]);

  const search = async (e) => {
    e.preventDefault();
    const resp = await axios
      .get(`/${word.toLowerCase()}`)
      .catch(() => setErr(true));
    setRespData(resp?.data);

    const the = await axiosThes
      .get(`/${word.toLowerCase()}`)
      .catch(() => setErr(true));
    setSyn(the?.data[0]?.meta?.syns);
    setAnt(the?.data[0]?.meta?.ants);

    var words = JSON.parse(localStorage.getItem("words")) || [];
    words.unshift({ word: word });
    localStorage.setItem("words", JSON.stringify(words));
    console.log(words);
  };
  const find = (e) => {
    setWord(e);
    var words = JSON.parse(localStorage.getItem("words")) || [];
    words.unshift({ word: e });
    localStorage.setItem("words", JSON.stringify(words));
    console.log(words);
  };

  const sound = (aud) => {
    let audio = new Audio(aud);
    audio.play();
  };

  const chDef = () => {
    setDef(true);
    setThes(false);
  };
  const chThes = () => {
    setThes(true);
    setDef(false);
  };

  const chSyn = () => {
    setIsSyn(true);
    setIsAnt(false);
  };
  const chAnt = () => {
    setIsAnt(true);
    setIsSyn(false);
  };

  const fav = () => {
    if (isFav === false) {
      setIsFav(true);
      var favs = JSON.parse(localStorage.getItem("favs")) || [];
      favs.unshift({ word: word });
      localStorage.setItem("favs", JSON.stringify(favs));
      console.log(favs);
    } else {
      setIsFav(false);
      console.log(favs);
    }
  };

  return (
    <div className="dict">
      <div className="con">
        <div className="form">
          <form onSubmit={search}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Search a word"
              />
              <SearchIcon
                onClick={search}
                style={{
                  color: "blue",
                  border: "1.5px solid blue",
                  borderRadius: "5px",
                  marginLeft: "5px",
                }}
                fontSize="large"
              />
            </div>
            <div className="opts">
              <p className={def && "white"} onClick={chDef}>
                Definition
              </p>
              <p className={thes && "white"} onClick={chThes}>
                Thesaurus
              </p>
            </div>
          </form>
        </div>

        {def && (
          <div className="container">
            {respData?.map((d) => (
              <div>
                <div className="tit">
                  <div style={{ background: "transparent" }}>
                    <p style={{ background: "transparent", fontSize: "26px" }}>
                      {d?.word}
                    </p>
                    <p style={{ background: "transparent" }}>
                      {d?.phonetics[0]?.text}
                    </p>
                  </div>
                  <div
                    style={{
                      background: "transparent",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <VolumeUpOutlinedIcon
                      onClick={() => sound(d.phonetics[0].audio)}
                      style={{
                        background: "transparent",
                        color: "blue",
                        margin: "5px 0",
                        padding: "3px",
                        borderRadius: "50%",
                        border: "2px solid blue",
                        boxShadow: "0 0 5px 2px blue",
                      }}
                      fontSize="large"
                    />
                    {isFav ? (
                      <FavoriteIcon
                        onClick={fav}
                        style={{
                          background: "transparent",
                          color: "blue",
                          margin: "5px 0",
                          padding: "3px",
                          borderRadius: "50%",
                          border: "2px solid blue",
                          boxShadow: "0 0 5px 2px blue",
                        }}
                        fontSize="large"
                      />
                    ) : (
                      <FavoriteBorderIcon
                        onClick={fav}
                        style={{
                          background: "transparent",
                          color: "blue",
                          margin: "5px 0",
                          padding: "3px",
                          borderRadius: "50%",
                          border: "2px solid blue",
                          boxShadow: "0 0 5px 2px blue",
                        }}
                        fontSize="large"
                      />
                    )}
                  </div>
                </div>

                <div>
                  {d.meanings.map((m) => (
                    <div className="pos">
                      <p
                        style={{
                          background: "transparent",
                          border: "1.5px solid black",
                          borderRadius: "2px",
                          width: "max-content",
                          padding: "2px",
                          boxShadow: "0 0 2px black",
                          color: "green",
                        }}
                      >
                        {m.partOfSpeech}
                      </p>
                      <p style={{ background: "transparent" }}>
                        {m.definitions.map((d) => (
                          <div
                            style={{
                              background: "transparent",
                              padding: "20px",
                            }}
                          >
                            <p style={{ background: "transparent" }}>
                              {d.definition}
                            </p>
                          </div>
                        ))}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {thes && (
          <div className="container">
            <div className="opts1">
              <p className={isSyn && "white"} onClick={chSyn}>
                Synonyms
              </p>
              <p className={isAnt && "white"} onClick={chAnt}>
                Antonyms
              </p>
            </div>
            {isSyn && (
              <div>
                <div
                  style={{
                    background:
                      "-webkit-linear-gradient(rgb(110, 5, 110), rgb(59, 6, 59), black)",
                    margin: "20px 0 0 20px",
                  }}
                >
                  <div className="syn">
                    {syn?.map((s) => (
                      <div>
                        {s?.map((e) => (
                          <p
                            onClick={() => find(e)}
                            style={{
                              background: "transparent",
                              margin: "3px",
                              float: "left",
                              border: "1px solid violet",
                              borderRadius: "2px",
                              padding: "2px",
                            }}
                          >
                            {e}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {isAnt && (
              <div>
                <div
                  style={{
                    background:
                      "-webkit-linear-gradient(rgb(12, 5, 110), rgb(16, 6, 59), black)",
                    margin: "20px 0 0 20px",
                  }}
                >
                  <div className="syn">
                    {ant?.map((a) => (
                      <div>
                        {a?.map((e) => (
                          <p
                            onClick={() => setWord(e)}
                            style={{
                              background: "transparent",
                              margin: "3px",
                              float: "left",
                              border: "1px solid blue",
                              borderRadius: "2px",
                              padding: "2px",
                            }}
                          >
                            {e}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {err && (
          <div className="error">
            <p>
              No Data Found...!
              <br />
              Please Enter a correct word
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dict;
/**/
