import React, { useEffect, useState, useRef } from "react";
import SearchInput from "./helpers/SearchInput";
import Loading from "./helpers/Loading";
import MeinMap from "./map/MeinMap";
import ResultsList from "./map/ResultsList";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import FullScreenDialog from "./map/FullScreenDialog";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function LocationPicke({ position, positionName, setPosition }) {
  const [address, setAddress] = useState("");
  const [results, setResults] = useState(null);
  const [selectedResults, setSelectedResults] = useState(0);
  const [loading, setloading] = useState(false);
  const [flyTriger, setflyTriger] = useState(false);
  const [editLocation, setEditLocation] = useState(null);
  
  // TODO: FIX TEH TIME OUT FETCH & TO INTEGRATE
  
  // const [searchNow, setSearchNow] = useState(false)
  
  // // time out to fetch results
  // const isFirstRender = useRef(true);
  // const WordCount = (str) => {
  //   return str.split(" ").length < 2;
  // };

  // useEffect(() => {
  //   if (WordCount(address)) {
  //     return;
  //   }
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false; // toggle flag after first render/mounting
  //     return;
  //   }
  //   const loadingTimer = setTimeout(() => {
  //     setloading(true);
  //     console.log("loading");
  //   }, 1000);
  //   const searchTimer = setTimeout(() => {
  //     handleSearch(address);
  //     console.log(address);
  //   }, 2000);
  //   return () => {
  //     clearTimeout(loadingTimer);
  //     clearTimeout(searchTimer);
  //   };
  // }, [address]);

  const handleSearch = (address) => {
    setloading(true);
    searchApi(address);
    setTimeout(() => {
      setloading(false);
    }, 2500);
  }

  const searchApi = (query) => {
    console.log(query);
    const apiNumination = "https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q="
    fetch(apiNumination + query)
      .then((result) => result.json())
      .then((parsedResult) => {
        setResults(parsedResult);
      })
      .then(() => {
        setflyTriger(true);
      });
  };

  useEffect(() => {
    if (results) {
      if (results[selectedResults] != 0) {
        setflyTriger(true);
      }
    }
  }, [results, selectedResults]);

  useEffect(() => {
    if (results) {
      if (results) {
        const locate = results[selectedResults];
        const { lat, lon } = locate;
        const initPosition = {
          lat: lat,
          lng: lon,
        };
        console.log(initPosition);
        setPosition(initPosition);
        console.log(position);
      }
    }
  }, [results, selectedResults]);

  React.useEffect(() => {
    console.log(results);
  }, [results]);

  // React.useEffect(() => {
  //   if (lating) {
  //     const [lat, lon] = lating;
  //     console.log(lat, lon);
  //   }
  // }, [lating]);

  const handleSelected = (id, locate) => {
    setSelectedResults(locate);
    console.log(selectedResults);
    setflyTriger(true);
  };

  return (
    <>
      <Box sx={{ m: 0, p: 0, flexGrow: 0 }}>
        <Grid container spacing={0} sx={{ m: 0, p: 0, pt: 2 }}>
          <Grid item xs={12} md={8} sx={{ m: 0, p: 0 }}>
            <Item
              style={{
                width: "100%",
                position: "relative",
              }}
              sx={{ m: 0, p: 0 }}
            >
              <MeinMap
                selectedResults={selectedResults}
                flyTriger={flyTriger}
                setflyTriger={setflyTriger}
                results={results}
                setSelectedResults={setSelectedResults}
                setEditLocation={setEditLocation}
              />
              
              <Box
                sx={{
                  justifyContent: "center",
                  margin: "auto",
                  alignContent: "center",
                  position: "absolute",
                  zIndex: "999",
                  top: 10,
                  left:'20%', 
               }}
              >
                <SearchInput handleSearch={handleSearch} loading={loading} address={address} setAddress={setAddress} />
              </Box>
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>
              {/* <Map results={results} selectedResults={selectedResults} /> */}
              <Loading loading={loading} address={address} />
              {!loading && results ? (
                results.length > 0 ? (
                  <ResultsList
                    results={results}
                    handleSelected={handleSelected}
                    setEditLocation={setEditLocation}
                    setSelectedResults={setSelectedResults}
                  />
                ) : (
                  <div>
                    <h2>No results</h2>
                    <h4>Please try different keywords</h4>
                  </div>
                )
              ) : (
                <div>
                  <h2>Please enter name address</h2>
                  <br />
                  <h4>Enter a street name and a city name</h4>
                  <br />
                  <h5>(For Example: "Burla, Tel Aviv")</h5>
                </div>
              )}
            </Item>
          </Grid>
        </Grid>
      </Box>
      {editLocation && results && (
        <FullScreenDialog
          positionName={positionName}
          editLocation={editLocation}
          setEditLocation={setEditLocation}
          selectedResults={selectedResults}
          results={results}
          position={position}
          setPosition={setPosition}
        />
      )}
    </>
  );
}

export default LocationPicke;
