import { Avatar, Grid, Paper, Typography } from "@mui/material";
import { height } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const UserProfile = () => {
//   const { name, imageUrl, email } = useSelector(
//     (state) => state.auth.authData.result
//   );
//   const dispatch = useDispatch();
const user = JSON.parse(localStorage.getItem('profile')).result;
const { name, imageUrl, email } = user;
  return (
    <Paper
      sx={{
        m: { xs: 5, sm: 10 },
        p: 3,
        mt: 5,
      }}
    >
      <Typography gutterBottom variant="h5" component="h2">
        User Profile
      </Typography>
      <div style={{
        margin: '40px',
        display: "flex",
        justifyContent: 'space-between'
        //  flexDirection: "row",
        //  flexWrap: 'revert'
      }}>
        <div>
          <Typography gutterBottom variant="h6" component="h5">
            Name: {name}
          </Typography>
          <Typography gutterBottom variant="h6" component="h5">
            Email: {email}
          </Typography>
        </div>
        <div>
          <Avatar
            src={imageUrl}
            sx={{
              width: 80,
              height: 80,
              // border: '3px solid whitesmoke'
            }}
          />
        </div>
      </div>
    </Paper>
  );
};

export default UserProfile;
