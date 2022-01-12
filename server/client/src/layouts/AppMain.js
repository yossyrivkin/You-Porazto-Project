import React, { createRef, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import logo from "../assets/img/logo-up.png";

import routes from "../routes";
import { Box, Toolbar, Typography } from "@mui/material";
import AppBarComp from "../components/AppBar/AppBarComp";
import Sidebar from "../components/Sidebar/Sidebar";
import theme from "../theme";
import { StepsProvider } from "../views/CreateStand/StepsContext";

const defaultDrawerWidth = 240;


const switchRoutes = (
  <Switch>
    {routes.map((route, key) => {
      if (route.layout === "/app") {
        return (
          <Route
            path={route.layout + route.path}
            component={route.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/app" to="/app/stands" />
  </Switch>
);

let rtlActive = false;

const images = [
  '/asset/images/kinus.jpg',
  '/asset/images/chbad_stand.jpg',
]

const AppMain = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(user ? defaultDrawerWidth : 0);
  const [image, setImage] = useState(images[0]);
  const [color, setColor] = useState("red");
  

  
  const handleImageClick = (image) => {
    setImage(image);
  };

  const handleColorClick = (color) => {
    setColor(color);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBarComp
          handleDrawerToggle={handleDrawerToggle}
          drawerWidth={drawerWidth}
          user={user}
          setUser={setUser}
        />
      {user ? <Box
        sx={{
          display: "flex",
        }}
      >
        
        <Sidebar
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
          routes={routes}
          logoText={"You Porazto"}
          logo={logo}
          image={image}
          color={color}
          drawerWidth={drawerWidth}
          setDrawerWidth={setDrawerWidth}
          window={undefined}
          rtlActive={rtlActive}
          user={user}

        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 0,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            // marginTop: "64px",
            // overflow: "auto",
            // position: "relative",
            // float: "right",
            // transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)",
            // maxHeight: "100%",
            // width: "100%",
            // overflowScrolling: "touch",
          }}
        >
          <Toolbar />
          <StepsProvider>
          {switchRoutes}
          </StepsProvider>
        </Box>
      </Box>
      :<Box>
       <Toolbar />
       
       </Box>}
    </>
  );
};

export default AppMain;
