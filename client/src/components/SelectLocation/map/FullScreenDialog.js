import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import FixedLocation from "./FixedLocation";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import { StepsContext } from "../../../views/CreateStand/StepsContext";

export default function FullScreenDialog({
  editLocation,
  standData,
  setStandData,
  positionName,
}) {
  const { activeStep, setActiveStep } = useContext(StepsContext);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleCancel = () => {
    setOpen(false);
  };
  const handleSet = (activeStep) => {
    setOpen(false);
    console.log("activ step" + activeStep);
    setActiveStep(1);
  };

  React.useEffect(() => {
    if (editLocation) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [editLocation]);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Set exact Location"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Drag the location marker inside the map to the exact spot where the
            position is located within the street.
          </DialogContentText>
          <FixedLocation
            standData={standData}
            setStandData={setStandData}
          />
          {standData.location && (
            <>
              <DialogTitle id="responsive-dialog-title">
                {"Current Location"}
              </DialogTitle>
              <DialogContentText>
                The location set for the position in the area:
                <Typography variant="buttton" color="primary">
                  {positionName.primeName}, {positionName.cityName}
                  <Typography variant="caption" gutterBottom>
                    {" "}
                    {positionName.zip}{" "}
                  </Typography>
                </Typography>
                <Box>
                  <Typography variant="caption" color="gray" gutterBottom>
                    Latitude: {standData.location.lat}{" "}
                  </Typography>
                  <Typography variant="caption" color="gray" gutterBottom>
                    Longitude: {standData.location.lng}{" "}
                  </Typography>
                </Box>
              </DialogContentText>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSet} autoFocus>
            Set Location
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
