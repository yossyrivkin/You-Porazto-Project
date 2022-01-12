import { Typography, Paper } from '@mui/material'
import React from 'react'

const Notifications = () => {
  return (
    <Paper
    sx={{
      m: { xs: 5, sm: 10 },
      p: 3,
      mt: 5,
    }}
  >
    <Typography gutterBottom variant="h5" component="h2">
      Nutifications
    </Typography>
    <div style={{
      margin: '40px',
      display: "flex",
      justifyContent: 'space-between'
      //  flexDirection: "row",
      //  flexWrap: 'revert'
    }}>
      <div>
        <Typography gutterBottom variant="h6" component="h5">
          No Nutifications Yet
        </Typography>
      </div>
      
    </div>
  </Paper>
  )
}

export default Notifications
