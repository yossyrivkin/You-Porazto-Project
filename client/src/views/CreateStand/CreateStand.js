import React, { useContext, useEffect, useState } from "react";
// import Resizeable from "../Dashboard/Resizeable";
import StepperComp from "./Stepper";
import SelectStandLocation from "./SelectStandLocation";
import LocationPicke from "../../components/SelectLocation/LocationPicke";
import { StepsProvider, StepsContext } from "./StepsContext";
import FormStandDetails from "../../components/FormStandDetails/FormStandDetails";
import FormContactDetails from "../../components/FormStandDetails/FormContactDetails";

import { createStand, updateStand } from "../../actions/stands";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, CircularProgress, Backdrop } from "@mui/material";
import { useHistory } from "react-router-dom";

const initialDataState = {
  city: "",
  street: "",
  locationDescription: "",
  firstName: "",
  lastName: "",
  phone: "",
  selectedFile: "",
  location: {lat: null, lng: null},
}

const CreateStand = () => {
  const [tab, setTab] = useState(0);
  const [step, setstep] = useState(0);
  const {activeStep, setActiveStep } = useContext(StepsContext);
  const [standData, setStandData] = useState(initialDataState);
  const [position, setPosition] = useState({
    lat: null,
    lng: null,
  });
  const [positionName, setPositionName] = useState([]);
  const [submitScreen, setSubmitScreen] = useState(false)
  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    if (position.lat === null) {
      return;
    }
    fetchPositionName(position);
  }, [position]);

  useEffect(() => {
    setStandData({ ...standData, location: position });
  }, [positionName]);
  useEffect(() => {
    console.log(standData);
  }, [standData]);

  const fetchPositionName = (position) => {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${position.lat}&lon=${position.lng}&format=json`
    )
      .then((result) => result.json())
      .then((parsedResult) => {
        const locate = parsedResult;
        const { road, town, country, city, state, village, zip } =
          locate.address;
        const { display_name, lat, lon, place_id } = locate;
        const primeName = road ? road : display_name;
        const cityName = village ? village : town ? town : city ? city : state;

        console.log(parsedResult);
        return setPositionName({ primeName, cityName, zip });
      });
  };

  const clear = () => {
    setStandData(initialDataState);
    setActiveStep(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitScreen(true)
    dispatch(createStand(standData));
    console.log(standData);
    setTimeout(() => {
      history.push('/app/dashboard')
    }, 4000);
    setActiveStep(0);
  };

  const steps = ["Stand location", "Stand Details", "Contact Details"];

  const components = [SelectStandLocation, FormStandDetails];

  return (
    <>
      <Box sx={{ p: 1, pt: 2 }}>
        <Typography variant="h6">Create A New Steand</Typography>
      </Box>
      <StepperComp
        steps={steps}
        handleSubmit={handleSubmit}
        clear={clear}
        standData={standData}
      >
        {/* {activeStep === 0 && <Resizeable/>}  */}
        {activeStep === 0 && (
          <LocationPicke
            position={position}
            setPosition={setPosition}
            positionName={positionName}
          />
        )}
        {activeStep === 1 && (
          <FormStandDetails
            handleSubmit={handleSubmit}
            clear={clear}
            standData={standData}
            setStandData={setStandData}
          />
        )}
        {activeStep === 2 && (
          <FormContactDetails
            handleSubmit={handleSubmit}
            clear={clear}
            standData={standData}
            setStandData={setStandData}
          />
        )}
      </StepperComp>
      {<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={submitScreen}
      >
        {
          
        }
        <CircularProgress color="inherit" />
      </Backdrop>
      }
    </>
  );
};

export default CreateStand;
