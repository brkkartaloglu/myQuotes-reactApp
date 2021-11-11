import React from "react";

import { Route } from "react-router-dom";
import Navi from "./components/navbar";
import Quotes from "./components/Quotes";

import useStyles from "./styles";
import { Container, AppBar, Grow, Grid } from "@material-ui/core";
import Favorites from "./components/Favorites";
import About from "./components/About";
import Search from "./components/Search";

export default function App() {
  const classes = useStyles();
  return (
    <Container>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Navi />
      </AppBar>
      <Grow in>
        <Container>
          <Grid item xs={12} sm={12}>
            <Route exact path="/">
              <Quotes />
            </Route>
            <Route exact path="/favorites">
              <Favorites />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/search">
              <Search />
            </Route>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}
