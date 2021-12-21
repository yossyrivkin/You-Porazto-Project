import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import resizeIcon from '/asset/resizeIcon.png'
import cursor from "./cursor.svg";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import theme from "../../theme";

import { NavLink, useLocation } from "react-router-dom";
import { Link } from "@mui/material";
import ToggleColorMode from "./DarkSwitch";
import DarkSwitch from "./DarkSwitch";

const Sidebar = ({
  window,
  handleDrawerToggle,
  mobileOpen,
  routes,
  drawerWidth,
  setDrawerWidth,
  rtlActive,
  logoText,
  logo,
  image,
}) => {
  const theme = useTheme();
  const desktopMode = useMediaQuery(theme.breakpoints.up("sm"));
  let location = useLocation();

  useEffect(() => {
    console.log(desktopMode);
  }, [desktopMode]);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // ==============================
  // resizeabled drawer
  // ==============================

  const minDrawerWidth = 50;
  const maxDrawerWidth = 500;

  const handleMouseDown = (e) => {
    document.addEventListener("mouseup", handleMouseUp, true);
    document.addEventListener("mousemove", handleMouseMove, true);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mouseup", handleMouseUp, true);
    document.removeEventListener("mousemove", handleMouseMove, true);
  };

  const handleMouseMove = useCallback((e) => {
    const newWidth = e.clientX - document.body.offsetLeft;
    if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
      setDrawerWidth(newWidth);
    }
  }, []);

  // ==============================
  // drawer bady link map
  // ==============================

  const drawerList = (
    <>
      <Divider />
      <List
        sx={{
          marginTop: "20px",
          paddingLeft: "0",
          paddingTop: "0",
          paddingBottom: "0",
          marginBottom: "0",
          listStyle: "none",
          position: "unset",
        }}
      >
        {routes.map((route, index) => {
          const itemColor = "#ffffffb0";
          const choiseItemColor = "#ffffff";
          const isActivRoute = (routeName) => {
            return location.pathname === routeName;
          };

          return (
            <NavLink
              to={route.layout + route.path}
              key={route.path}
              style={{
                position: "relative",
                display: "block",
                textDecoration: "none",
              }}
            >
              <ListItem
                button
                key={route.path}
                sx={{
                  width: "auto",
                  transition: "all 300ms linear",
                  pading: "10px 15px 0",
                  borderRadius: "3px",
                  position: "relative",
                  // display: "block",
                  padding: "10px 15px",
                  backgroundColor: "transparent",
                  "&:hover,&:focus,&:visited": {
                    backgroundColor: "#ffffff80",
                  },
                }}
              >
                <ListItemIcon>
                  <route.icon
                    sx={{
                      width: "24px",
                      height: "30px",
                      fontSize: "24px",
                      lineHeight: "30px",
                      float: "left",
                      marginRight: "15px",
                      textAlign: "center",
                      verticalAlign: "middle",
                      color: "#ffffffb0",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={route.name}
                  sx={{
                    margin: "0",
                    lineHeight: "30px",
                    fontSize: "14px",
                    color: isActivRoute ? choiseItemColor : itemColor,
                  }}
                />
              </ListItem>
              <Divider />
            </NavLink>
          );
        })}
      </List>
    </>
  );

  // ==============================
  // drawer layout
  // ==============================

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
        position: "relative",
        top: "0",
        height: "100vh",
      }}
      aria-label="mailbox folders"
    >
      {/* The implementation bulid with js to avoid SEO duplication of links. */}
      <Drawer
        // container={container}
        variant={desktopMode ? "permanent" : "temporary"}
        transitionDuration={500}
        open={desktopMode ? true : mobileOpen}
        onClose={handleDrawerToggle}
        anchor={!rtlActive ? "left" : "right"}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        paper={{
          border: "none",
          position: "fixed",
          top: "0",
          bottom: "0",
          left: "0",
          zIndex: "1",
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <Toolbar />
        {/* ====================
      === resize line
      ======================*/}
        <Box
          onMouseDown={(e) => handleMouseDown(e)}
          sx={{
            width: "5px",
            cursor: `url(/asset/resizeIcon.png) 12 12, url(${cursor}) 12 12, ew-resize`,
            padding: "4px 0 0",
            borderTop: "1px solid #ddd",
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            zIndex: 150,
            backgroundColor: "#f4f7f9",
          }}
        />
        {/* ====================
      === logo
      ======================*/}

        <Box
          sx={{
            position: "relative",
            padding: "15px 15px",
            zIndex: "4",
            "&:after": {
              content: '""',
              position: "absolute",
              bottom: "0",
              height: "1px",
              right: "15px",
              width: "calc(100% - 30px)",
              backgroundColor: "rgba(221, 221, 221, 0.3)",
            },
          }}
        >
          <Link
            href="/"
            sx={{
              textTransform: "uppercase",
              padding: "5px 0",
              display: "block",
              fontSize: "18px",
              textAlign: "left",
              fontWeight: "400",
              lineHeight: "30px",
              textDecoration: "none",
              backgroundColor: "transparent",
              "&:hover": {
                color: "white",
              },
            }}
          >
            <Box
              sx={{
                width: "30px",
                display: "inline-block",
                maxHeight: "30px",
                marginLeft: "10px",
                marginRight: "15px",
              }}
            >
              <img
                src={logo}
                alt="logo"
                style={{
                  width: "35px",
                  top: "12px",
                  position: "absolute",
                  verticalAlign: "middle",
                  border: "0",
                }}
              />
            </Box>
            {logoText}
          </Link>
        </Box>

        {/* ====================
      === drawer list
      ======================*/}

        <Box
          sx={{
            position: "relative",
            // height: "calc(100vh - 75px)",
            // overflow: "auto",
            // width: "260px",
            zIndex: "4",
            // overflowScrolling: "touch",
          }}
        >
          {drawerList}
          <Box
            sx={{
              position: 'fixed',
              bottom: '50px',
              left: "0px",
            }}
          >
            <DarkSwitch />
          </Box>
        </Box>
        {/* ====================
      === background image
      ======================*/}

        {image !== undefined ? (
          <Box
            sx={{
              position: "absolute",
              zIndex: "1",
              height: "100%",
              width: "100%",
              display: "block",
              top: "0",
              left: "0",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundImage: `url(${image})`,
              "&:after": {
                position: "absolute",
                zIndex: "3",
                width: "100%",
                height: "100%",
                content: '""',
                display: "block",
                background: "black",
                opacity: ".8",
              },
            }}
          />
        ) : null}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
