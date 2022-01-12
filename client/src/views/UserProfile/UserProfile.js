import { Avatar, Box, Paper, Typography } from "@mui/material";
import { height } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MyStands from "./MyStands/MyStands";

const UserProfile = () => {
  //   const { name, imageUrl, email } = useSelector(
  //     (state) => state.auth.authData.result
  //   );
  //   const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile")).result;
  const { name, imageUrl, email } = user;
  return (
    <>
      {!user ? null : (
        <>
          {" "}
          <Paper
            sx={{
              m: { xs: 2, sm: 10 },
              p: 1,
              mt: 5,
              bgcolor: "whitesmoke",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography gutterBottom variant="h5" component="h2">
                My Acount
              </Typography>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Avatar
                src={imageUrl}
                sx={{
                  width: 80,
                  height: 80,
                  margin: 3,
                  // border: '3px solid whitesmoke'
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            ></div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography gutterBottom variant="h6" component="h5">
                Name: {name}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography gutterBottom variant="h6" component="h5">
                Email: {email}
              </Typography>
            </div>
          </Paper>
          <Paper
            sx={{
              m: { xs: 2, sm: 10 },
              p: 3,
              mt: 5,
              bgcolor: "whitesmoke",
            }}
          >
            <Typography gutterBottom variant="h5" component="h2">
              My Stands
            </Typography>
            <Box
              sx={{
                // height: "580px",
                // overflowY: "auto",
                // marginRight: "30px",
                mx: 2,
                mb: 2,
              }}
            >
              <MyStands />
            </Box>
          </Paper>
        </>
      )}
    </>
  );
};

export default UserProfile;
