import React, { useEffect, useState } from "react";
import { Grid, CircularProgress, Toolbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import MyStand from "./MayStand/MyStand";
import useStyles from "./styles";
import { getStandsByCreator } from "../../../actions/stands";


const MyStands = ({ setCurrentId }) => {
  
  const dispatch = useDispatch();
  const { myStands, isLoading } = useSelector((state) => state.stands);
 
  useEffect(() => {
    dispatch(getStandsByCreator())
  }, []);

  const classes = useStyles();

  return (
    <>
      <Toolbar />
      {!myStands ? <CircularProgress /> :  (
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {myStands.map((stand) => (
            <Grid key={stand._id} item xs={12} sm={6} md={6}>
              <MyStand stand={stand} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default MyStands;
