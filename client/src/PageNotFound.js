import { Button, Paper, Typography } from '@mui/material'
import { Home } from '@mui/icons-material'
import React, { useEffect } from 'react'
import './pnf.css'
// import { useIntl } from 'react-intl'

const PageNotFound = () => {
  // const intl = useIntl()

  useEffect(() => {
    document.title = '404 | Page NOT Found'
  }, [])
  return (<>
  <div className='page-not-found'>
  <a href target="_blank">
    <header className="top-header">
    </header>
    {/*dust particel*/}
    <div>
      <div className="starsec" />
      <div className="starthird" />
      <div className="starfourth" />
      <div className="starfifth" />
    </div>
    {/*Dust particle end-*/}
    <div className="lamp__wrap">
      <div className="lamp">
        <div className="cable" />
        <div className="cover" />
        <div className="in-cover">
          <div className="bulb" />
        </div>
        <div className="light" />
      </div>
    </div>
    {/* END Lamp */}
  </a><section className="error"><a href target="_blank">
      {/* Content */}
    </a><div className="error__content"><a href target="_blank">
        <div className="error__message message">
          <h1 className="message__title">Page Not Found</h1>
          <p className="message__text">We're sorry, the page you were looking for isn't found here. The link you followed may either be broken or no longer exists. Please try again, or take a look at our.</p>
        </div>
      </a>
      <div className="error__nav e-nav"><a href="/" target="_blank">
        </a><a href="/" target="_blanck" className="e-nav__link" />
      </div>
    </div>
    {/* END Content */}
  </section>
</div>
      {/* <Paper
        sx={{
          backgroundColor: (t) => t.palette.background.default,
          margin: 0,
          height: `calc(100vh - 64px)`,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: `100%`,
          }}
        >
          <Typography variant="h4">404</Typography>
          <Typography variant="subtitle1">
           Page NOT Found
          </Typography>
          <Typography variant="subtitle1">
           Page NOT Found
          </Typography>
          <Button
            color="secondary"
            aria-label="home"
            href="/"
            style={{ marginTop: 20 }}
          >
            <Home />
          </Button>
        </div>
      </Paper> */}
      </>
  )
}

export default PageNotFound
