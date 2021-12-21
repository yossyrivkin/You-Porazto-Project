import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { switchDarkMode } from './../../actions/userExp'
import { useDispatch, useSelector } from "react-redux";

export default function DarkSwitch() {

  const dispatch = useDispatch();

  const theme = useTheme();
  const { mode } = useSelector((state) => state.userExp);
  console.log(mode);
  return (
    <Box
      sx={{
        bottom: '15px',
        display: 'flex',
        height: '40px',
        width: '40px',
        alignItems: 'left',
        justifyContent: 'center',
        justifyItems: 'center',
        bgcolor: 'background.default',
        opacity: 0.2,
        color: 'text.primary',
        borderRadius: 1,
      }}
    >
      {/* {mode} mode */}
      <IconButton sx={{ m: 0, p: 1 }} onClick={() => dispatch(switchDarkMode(mode))} color="inherit">
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}
