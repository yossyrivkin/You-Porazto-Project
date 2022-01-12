import React from "react";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';


const IconButton = ({ tytle }) => {
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" endIcon={<SendIcon />}>
          {tytle}
        </Button>
      </Stack>
    </div>
  );
};

export default IconButton;
