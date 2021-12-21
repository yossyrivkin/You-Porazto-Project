import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loading = ({ loading, address }) => {
  return (
    loading && (
      <div>
        <h2>Search Results for "{address}"</h2>
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>
    )
  );
};

export default Loading;
