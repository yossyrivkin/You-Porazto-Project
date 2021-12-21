import React, { useEffect } from "react";
import { List, Box, Button } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DraftsIcon from "@mui/icons-material/Drafts";
import StreetviewIcon from "@mui/icons-material/Streetview";
import EditLocationAltIcon from "@mui/icons-material/Streetview";


const ResultsList = ({ results, handleSelected }) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [editLocation, setEditLocation] = React.useState(null);

    const handleListItemClick = (locate, id) => {
      setSelectedIndex(id);
      handleSelected(locate, id)
    
    };

    // useEffect(() => {
    //     handleSelected(results[selectedIndex])
    // }, [])
  
  return (
    <>
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <List component="nav" aria-label="main mailbox folders">
          {results.map((locate, id) => {
            const { road, town, country, city, state, village } =
              locate.address;
            const { display_name, lat, lon } = locate;
            const primeName = road ? road : display_name;
            const cityName = city
              ? city
              : town
              ? town
              : village
              ? village
              : state;
            console.log("result rending");
            return (
              <ListItem key={id} disablePadding>
                <ListItemButton 
                    onClick={() => handleListItemClick(locate, id)}
                    selected={selectedIndex === id}
                    >
                  <ListItemIcon>
                    <StreetviewIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={primeName}
                    secondary={`${cityName}, ${country}`}
                  />
                    <Button variant="contained" 
                    onClick={(id) => {setEditLocation(id)}}
                    endIcon={<EditLocationAltIcon />}>
                        Edit
                    </Button>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </>
  );
};

export default ResultsList;
