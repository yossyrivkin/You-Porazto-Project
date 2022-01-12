import React, { useState } from "react";
import { createStand, updateStand } from "../../actions/stands";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import FullWidthTabs from "./FullWidthTabs";

const UpdateStand = () => {
  const { id } = useParams();
  console.log(id);
  const { myStands } = useSelector((state) => state.stands);
  const stand = useSelector((state) => state.stands.myStands.find(message => message._id === id) );
  console.log(myStands);
  console.log(stand);
  const { city, street, locationDescription, firstName, lastName, phone, selectedFile,
  location } = stand? stand : null;
  const initialDataState = {
    city: city || "",
    street: street || "",
    locationDescription: locationDescription || "",
    firstName: firstName || "",
    lastName: lastName || "",
    phone: phone || "",
    selectedFile: selectedFile || "",
    location: {lat: location.coordinates[1], lng: location.coordinates[0]} || {lat: null, lng: null},
  };
  console.log(initialDataState);

  const [standData, setStandData] = useState(initialDataState);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = () => {
    dispatch(updateStand(id, standData))
    setTimeout(() => {
      history.push("/app/dashboard");
    }, 4000);
  }

  return (
    <>
      {stand === null ?
       <Box sx={{ p: 1, pt: 2 }}>
       <Typography variant="h6">
         No Stand To Update...
       </Typography>
     </Box>
     : <><Box sx={{ p: 1, pt: 2 }}>
        <Typography variant="h6">
          Apdete Stand {standData.street}, {standData.city}
        </Typography>
      </Box>
      <FullWidthTabs standData={standData} setStandData={setStandData} />
      <Box
      sx={{
        position: "absolute",
        bottom: '20px'
      }}
      >
      <Button onClick={handleSubmit}>
        submit
      </Button  >
      </Box>
      </>}
    </>
  );
};

export default UpdateStand;
