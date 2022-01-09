import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

export default function FeatureInDev({ DevFeatureOpen, setDevFeatureOpen }) {

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={DevFeatureOpen}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setDevFeatureOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Close me!
        </Alert>
      </Collapse>
      <Button
        disabled={DevFeatureOpen}
        variant="outlined"
        onClick={() => {
            setDevFeatureOpen(true);
        }}
      >
        Re-open
      </Button>
    </Box>
  );
}
