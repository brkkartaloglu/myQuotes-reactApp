import { AppBar, Button, Grid, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Quotes from "./Quotes";
import useStyles from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { getQuotebySearch } from "../actions/records";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

export default function Search() {
  const [search, setSearch] = useState("");
  const classes = useStyles();
  const [countDisplay, setcountDisplay] = useState(false);

  const dispatch = useDispatch();
  const { quote } = useSelector((state) => state.quotes);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchQuote();
    }
  };

  const searchQuote = () => {
    if (search.trim() !== "") {
      dispatch(getQuotebySearch(search));

      setcountDisplay(true);
    }
  };
  useEffect(() => {
    if (countDisplay) {
      alertify.notify(
        `${quote.totalCount} quotes found about ${search} `,
        "success",
        3
      );
      setcountDisplay(false);
    }
  }, [quote]);
  return (
    <>
      <Grid>
        <AppBar
          className={classes.appBarSearch}
          position="static"
          color="inherit"
        >
          <TextField
            onKeyDown={handleKeyPress}
            name="search"
            variant="outlined"
            label="Search by Tag (inspirational, friendship, famous-quotes, wisdom etc. )"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></TextField>
          <Button
            onClick={() => {
              searchQuote();
            }}
            variant="contained"
            color="primary"
          >
            Search
          </Button>
        </AppBar>
      </Grid>
      <Quotes searchMode={true} tag={search} id={quote.id}></Quotes>
    </>
  );
}
