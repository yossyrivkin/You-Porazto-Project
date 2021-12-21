import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import zIndex from "@mui/material/styles/zIndex";

export default function SearchInput({
  handleSearch,
  loading,
  address,
  setAddress,
}) {
  const handleChange = (e) => {
    setAddress(e.target.value);
  };
  const [error, setError] = React.useState("");

  const keyPress = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
      console.log("press enter");
      handleValidation(address)
    }
  };

  const handleError = (error) => {
    switch (error) {
      case 'no_value':
        setError("Must fill value");
        setTimeout(() => {
          setError("");
        }, 1500);
  
        break;
    
      default:
        break;
    }
    
  };
  const handleValidation = (address) => {
    if (!address) {
      handleError('no_value')
    } else {
      handleSearch(address);
    }

  }

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "80%",
        position: "relative",
      }}
    >
      {loading && (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            zIndex: 1150,
            top: 0,
            left: 0,
          }}
        >
          <LinearProgress value={99} />
        </Box>
      )}
      <IconButton sx={{ p: "10px" }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        error={error}
        // name="searchAddress"
        sx={{ ml: 1, flex: 1 }}
        // autoFocus={true}
        placeholder={error ? error : "Search Address"}
        // inputProps={{ "aria-label": "Search Address" }}
        onChange={handleChange}
        onKeyDown={keyPress}
        value={address}
      />
      <IconButton
        onClick={() => handleValidation(address)}
        sx={{ p: "10px" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
        <DirectionsIcon />
      </IconButton>
    </Paper>
  );
}
