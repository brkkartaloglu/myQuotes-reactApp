import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import TwitterIcon from "@mui/icons-material/Twitter";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { useDispatch } from "react-redux";
import { getQuote, addFav, getQuotebySearch } from "../actions/records";
import { useSelector } from "react-redux";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

export default function Quotes({ searchMode, tag, id }) {
  const { quote } = useSelector((state) => state.quotes);
  const [favIconChange, setfavIconChange] = useState(true);
  const dispatch = useDispatch();
  const favs = localStorage.getItem("favorites");

  const randGen = () => {
    if (tag) {
      dispatch(getQuotebySearch(tag, id));
    } else {
      dispatch(getQuote());
    }
  };

  const addtoFav = () => {
    dispatch(addFav(quote));
    setfavIconChange(false);
  };
  const coptToClipBoard = () => {
    navigator.clipboard.writeText(quote.content);
    alertify.notify("Copied to Clipboard", "success", 3);
  };
  const tweet = () => {
    let twtpost = `https://twitter.com/intent/tweet?text=${quote.content}`;
    window.open(twtpost);
  };

  useEffect(() => {
    if (favs) {
      const favsArray = Object.values(JSON.parse(favs));
      favsArray.forEach((item) => dispatch(addFav(item)));

      if (favsArray.find((item) => item.id === quote.id))
        setfavIconChange(false);
      else setfavIconChange(true);
    }
  }, []);

  useEffect(() => {
    if (favs) {
      const favsArray = Object.values(JSON.parse(favs));
      if (favsArray.find((item) => item.id === quote.id))
        setfavIconChange(false);
      else setfavIconChange(true);
    }
  }, [quote]);
  return (
    <>
      <center>
        <Paper
          elevation={3}
          className={searchMode ? "img-fluid-sm" : "img-fluid"}
        >
          <h5>
            <span>
              <FormatQuoteIcon />
            </span>
            {quote.content}
            <span>
              <FormatQuoteIcon />
            </span>
          </h5>
          <p>-{quote.author}</p>
          <div className="bottombtn">
            <hr />
            <Tooltip title={searchMode ? "Next One" : "Random"}>
              <Fab
                color="secondary"
                onClick={randGen}
                style={{ margin: "5px" }}
              >
                {searchMode ? <NavigateNextIcon /> : <AutorenewIcon />}
              </Fab>
            </Tooltip>
          </div>
        </Paper>
      </center>

      {favIconChange ? (
        <Tooltip title="Add to Favorites">
          <Button
            style={{ background: "hotpink" }}
            onClick={addtoFav}
            className="twt"
          >
            <FavoriteIcon
              style={{ height: "35px", width: "35px" }}
              color="primary"
            />
          </Button>
        </Tooltip>
      ) : (
        <Tooltip title="Added to Favorites already">
          <span>
            <Button style={{ background: "hotpink" }} disabled className="twt">
              <CheckCircleIcon
                style={{ height: "35px", width: "35px" }}
                color="primary"
              />
            </Button>
          </span>
        </Tooltip>
      )}

      <Tooltip title="Copy to Clipboard">
        <Button
          style={{ background: "thistle" }}
          onClick={coptToClipBoard}
          className="twt"
        >
          <ContentCopyIcon
            style={{ height: "35px", width: "35px" }}
            color="primary"
          />
        </Button>
      </Tooltip>
      <Tooltip title="Tweet">
        <Button
          style={{ background: "Salmon" }}
          onClick={tweet}
          className="twt"
        >
          <TwitterIcon
            style={{ height: "35px", width: "35px" }}
            color="primary"
          />
        </Button>
      </Tooltip>
      <br />
    </>
  );
}
