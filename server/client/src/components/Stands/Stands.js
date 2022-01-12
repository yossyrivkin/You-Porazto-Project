import React from "react";
import { Grid, CircularProgress, Toolbar } from "@mui/material";
import { useSelector } from "react-redux";

import Stand from "./Stand/Stand";
import useStyles from "./styles";

const Stands = ({ setCurrentId }) => {
  const stands = useSelector((state) => {
    console.log(state);
    return state.stands.stands;
  });
  const classes = useStyles();

  return (
    <>
      <Toolbar />
      {!stands.length ? null : (
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {stands.map((stand) => (
          <Grid key={stand._id} item xs={12} sm={6} md={6}>
            <Stand stand={stand} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
      )}
    </>
  );
};

export default Stands;
