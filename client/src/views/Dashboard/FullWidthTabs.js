import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormStandDetails from "../../components/FormStandDetails/FormStandDetails";
import FormContactDetails from "../../components/FormStandDetails/FormContactDetails";
import FixedLocation from "../../components/SelectLocation/map/FixedLocation";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  MapConsumer,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import Fullscreen from "react-leaflet-fullscreen-plugin";
import { Paper } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {/* {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography></Typography>
        </Box>
        {children}
      )} */}
      {children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs({ standData, setStandData }) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Stand" {...a11yProps(0)} />
          <Tab label="Contact" {...a11yProps(1)} />
          <Tab label="Location" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <FormStandDetails standData={standData} setStandData={setStandData} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <FormContactDetails
            standData={standData}
            setStandData={setStandData}
          />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <div>
            <h4>drag the icon to the fixed place</h4>
          </div>
          <Paper width={8}  elevation={3}>
            <FixedLocation standData={standData} setStandData={setStandData} />
          </Paper>
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
