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
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

import React, { useState, useEffect } from "react";

import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getStandsBySearch } from '../../actions/stands';

import decode from "jwt-decode";
import * as actionType from "../../constants/actionTypes";

import { styled, alpha } from "@mui/material/styles";

import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Button, Icon } from "@mui/material";
import UserAvatar from "./UserAvatar";
import { display } from "@mui/system";
import { NoEncryption } from "@mui/icons-material";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: 2,
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: 3,
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
      "&:focus": {
        width: "35ch",
      },
    },
  },
}));

const AppBarComp = ({ handleDrawerToggle, drawerWidth, user, setUser }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [search, setSearch] = useState('');
  
  const searchStand = () => {
    if (search.trim()) {
      dispatch(getStandsBySearch({ search }));
      history.push(`/app/stands/search?searchQuery=${search || 'none'}`);
    }  
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()  
      searchStand();
    }
  };

  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const open = Boolean(anchorElUser);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const userImage = user.result.imageUrl;

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/auth");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        // position="sticky"
        sx={{
          height: { xs: "55px", sm: "65px" },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            sx={{
              ml: 0,
              mr: 0,
              "&:hover": {
                width: 30,
                height: 40,
              },
            }}
            onClick={() => history.push("/")}
          >
            <img src="/logo-up.png" height={24} width={18}></img>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              flexGrow: 1,
              "&:hover": {
                fontSize: "1.2rem",
                cursor: "pointer",
              },
            }}
            onClick={() => history.push("/")}
          >
            You Porazto!
          </Typography>
          {user ? (
            <>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  onKeyDown={handleKeyPress}
                  value={search} 
                  onChange={(e) => setSearch(e.target.value)}
                  name="search" 
                  id="search"
                  label="Search Stands"
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Tooltip
                  title="Mails | Feature in development, will be released in the following version"
                  TransitionComponent={Zoom}
                  arrow
                  sx={{
                    fontSize: '3.5rem'
                  }}
                >
                  <span>
                    <IconButton
                      disabled
                      size="large"
                      aria-label="show 4 new mails"
                      color="inherit"
                    >
                      <Badge badgeContent={0} color="error">
                        <MailIcon />
                      </Badge>
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip
                  title="Notifications | Feature in development, will be released in the following version"
                  TransitionComponent={Zoom}
                  arrow
                >
                  <span>
                    <IconButton
                      disabled
                      size="large"
                      aria-label="show new notifications"
                      color="inherit"
                    >
                      <Badge badgeContent={0} color="error">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                  </span>
                </Tooltip>
              </Box>
              <Button
                sx={{
                  my: 2,
                  display: { xs: "none", sm: "block" },
                }}
                color="inherit"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              sx={{
                my: 2,
              }}
              onClick={() => history.push("/auth")}
              color="inherit"
            >
              Login
            </Button>
          )}
          <Tooltip title="User settings">
            <IconButton
              onClick={handleOpenUserMenu}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              {user ? (
                <UserAvatar userName={user.result.name} userImage={userImage} />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorElUser}
            id="account-menu"
            open={open}
            onClose={handleCloseUserMenu}
            onClick={handleCloseUserMenu}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <UserAvatar userName={user.result.name} userImage={userImage} />
              {user.result.name}
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => history.push("/app/user-profile")}>
              <ListItemIcon>
                <AccountCircle fontSize="small" />
              </ListItemIcon>
              My Profile
            </MenuItem>
            {/* <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem> */}
            <MenuItem onClick={logout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppBarComp;
