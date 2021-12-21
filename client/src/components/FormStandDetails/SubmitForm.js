import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import MapIcon from "@mui/icons-material/Map";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import {
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import React, { useState } from "react";
import { green, pink, orange } from "@mui/material/colors";

const ReviewDetails = ({ standData }) => {

  let { 
    city,
    street,
    locationDescription: desc,
    firstName,
    lastName,
    phone,
    selectedFile,
    location,
  } = standData

  let { lat, lng} = location;

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="location" sx={{ bgcolor: pink[500] }}>
            <MapIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={street}
          component="span"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {city}
              </Typography>
              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="body2"
              >
                {desc}
              </Typography>
              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="caption"
              >
                {`coordinates: ${lat} , ${lng}`}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />

      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="media" sx={{ bgcolor: orange[500] }}>
            <InsertPhotoIcon />
          </Avatar>
        </ListItemAvatar>
      { selectedFile? <img alt="Stand Photo" width={'200px'} src={selectedFile}/> : <ListItemText
          primary="Your Media"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                You haven't uploaded a photo yet
              </Typography>
              {
                 " — A picture of the position can increase the involvement of activists and help locate the position."
              }
            </React.Fragment>
          }
        />}
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="contact" sx={{ bgcolor: green[500] }}>
            <ContactPhoneIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={phone}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {firstName} {lastName}
              </Typography>
              {" — Coordinates the activity of the position on Fridays"}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
};

const SubmitForm = ({ handleSubmit, clear, standData }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={1} sm={4} />
      <Grid item xs={10} sm={4}>
        <Paper
          sx={{
            p: 2,
            mt: 2,
            mx: "auto",
            display: "block",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Typography alignContent='center' variant="h6" textAlign='center'>Confirm and Submit</Typography>
         
          <ReviewDetails standData={standData}/>

          <Divider />

          <div
          className={{
            width: "97%",
            margin: "10px 0",
          }}
        >
         <Button
          sx={{ marginBottom: 1 }}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
        </div>
        </Paper>
      </Grid>
      <Grid item xs={1} sm={2} />
    </Grid>
  );
};

export default SubmitForm;
