import React from 'react'
import AppBar from '@mui/material/AppBar'

const Footer = () => {
  return (
    <React.Fragment>
      <div
       style={{
         bottom: '50px',
        height: '500px',
        //width: '100%',public\asset\mivzoim10.png
        backgroundImage: 'url(/Tefillin_in_india1.jpeg)',
        // backgroundImage: 'url(bottom.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
      ></div>
      <AppBar
        position="relative"
        style={{
          //position: 'absolute',
          width: '100%',
          padding: 18,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        id="footer-text"
      >
        {`© ${new Date().getFullYear()}  you-porazto project!`}
        <span>All Rights Reserved</span>
      </AppBar>
    </React.Fragment>
  )
}

export default Footer
