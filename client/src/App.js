import React, { useEffect, useState, useMemo } from "react";
import LandingPage from "./LandingPage/index";
import Auth from "./components/Auth/Auth";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import AppMain from "./layouts/AppMain";
import PageNotFound from "./PageNotFound";
import { green, purple, red } from "@mui/material/colors";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

// import theme from './theme'
export default function App() {


  const { mode } = useSelector((state) => state.userExp);
  // const state = useSelector((state) => state);

  // useEffect(() => {
  //   console.log(state);
  // }, [])


  const theme = React.useMemo(() => createTheme({
        palette: {
          primary: {
            main: '#820600',
          },
          secondary: {
            main: '#AB5D00',
          },
          mode,
        },
        // direction: 'rtl',
        typography: {
          fontFamily: 'Roboto, Assistant',
        },
      
        spacing: 8
      }),
    [mode],
  );


  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route 
            path="/app" 
            component={() => user? <AppMain /> : <Redirect to="/auth" /> }
             />
          <Route
            path="/auth"
            exact
            component={Auth}
          />
          <Route path="/posts/search" exact component={AppMain} />
          <Route path="/posts/search" exact component={AppMain} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
