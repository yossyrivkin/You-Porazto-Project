import { PhotoCamera } from "@mui/icons-material";
import { Button, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import FileBase from 'react-file-base64';
import theme from "../../theme";

const FormStandDetails = ({ handleSubmit, clear, standData, setStandData }) => {

  return (
    <Grid container spacing={0}>
      <Grid item xs={1} sm={2} />
      <Grid item xs={10} sm={8}>
    <Paper
      sx={{
        p: 2,
        mt: 2,
        mx: 'auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',

      }}
    >
        <Typography variant="h6">Add Contact Details</Typography>
        <TextField
        sx={{
            m: 1
        }}
          name="firstName"
          variant="outlined"
          label="First Name"
          fullWidth
          value={standData.firstName}
          onChange={(e) =>
            setStandData({ ...standData, firstName: e.target.value })
          }
        />
        <TextField
        sx={{
            m: 1
        }}
          name="lastName"
          variant="outlined"
          label="Last Name"
          fullWidth
          value={standData.lastName}
          onChange={(e) =>
            setStandData({ ...standData, lastName: e.target.value })
          }
        />
        <TextField
        sx={{
            m: 1
        }}
          name="phone"
          variant="outlined"
          label="Phone"
          type="tel"
          fullWidth
          value={standData.phone}
          onChange={(e) =>
            setStandData({ ...standData, phone: e.target.value })
          }
        />
        <div
          className={{
            width: "97%",
            margin: "10px 0",
          }}
        >
         
        </div>
        
    </Paper>
    </Grid>
    <Grid item xs={1} sm={2} />

    </Grid>
  );
};

export default FormStandDetails;
