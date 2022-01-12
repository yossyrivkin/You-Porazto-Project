import { PhotoCamera } from "@mui/icons-material";
import {
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FileBase from "react-file-base64";
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
            mx: "auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">Add Stand Details</Typography>
          <TextField
            sx={{
              m: 1,
            }}
            name="city"
            variant="outlined"
            label="City"
            fullWidth
            value={standData.city}
            onChange={(e) =>
              setStandData({ ...standData, city: e.target.value })
            }
          />
          <TextField
            sx={{
              m: 1,
            }}
            spacing={2}
            name=" street"
            variant="outlined"
            label="Street"
            fullWidth
            value={standData.street}
            onChange={(e) =>
              setStandData({ ...standData, street: e.target.value })
            }
          />
          <TextField
            sx={{
              m: 1,
            }}
            name=" location-description"
            variant="outlined"
            label="Location Description"
            fullWidth
            value={standData.locationDescription}
            onChange={(e) =>
              setStandData({
                ...standData,
                locationDescription: e.target.value,
              })
            }
          />
          <Button
            sx={{
              my: 1,
              width: "280px",
            }}
            color="secondary"
            size="small"
            //   startIcon={<PhotoCamera />}
          >
            Aply Stand Picture
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setStandData({ ...standData, selectedFile: base64 })
              }
            />
            {standData.selectedFile ? (
              <img
                src={
                  standData.selectedFile ||
                  "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                }
                alt="hello"
                width={"30px"}
              />
            ) : null}
          </Button>
          <Divider />
        </Paper>
      </Grid>
      <Grid item xs={1} sm={2} />
    </Grid>
  );
};

export default FormStandDetails;
