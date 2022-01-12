/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";

import { getStands } from "../../actions/stands";
import { makeStyles } from '@mui/styles';

makeStyles(() => ({
  ul: {
    justifyContent: "space-around",
  },
}));

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.stands);
  const dispatch = useDispatch();

  const classes = makeStyles();

  const getUserLocation = new Promise(function(resolve, reject) {
    let lat, lng;
    navigator.geolocation.getCurrentPosition(function(pos){
        lat = pos.coords.latitude
        lng = pos.coords.longitude
        resolve({lat, lng});
    });
  });

// *****************************************************************
// *******TODO: WRITE SERVER SIDE FUNCTIONAL SORTING BY COORDS*****
// *****************************************************************

  useEffect(() => {
    const getStandByLocation = async () => {
      const userLocation = await getUserLocation;
      console.log(userLocation)
      if (page) {
        dispatch(getStands(page, userLocation));
      }
    }
    getStandByLocation()
  }, [dispatch, page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/app/stands?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
