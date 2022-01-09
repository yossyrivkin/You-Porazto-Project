import React, { useState, lazy, Suspense } from 'react'
import {
  AppBar,
  CssBaseline,
  Paper,
  Toolbar,
  Button,
  CircularProgress,
} from '@mui/material'

// import { Helmet } from 'react-helmet'
import { Scrollbars } from 'react-custom-scrollbars'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useHistory } from 'react-router-dom'
// import { useTheme as useAppTheme } from 'material-ui-shell/lib/providers/Theme'
// import d from 'final-form-arrays'
const PageContent = lazy(() => import('./PageContent'))
const Footer = lazy(() => import('./Footer'))
// const ResponsiveMenu = lazy(() =>
//   import('rmw-shell/lib/containers/ResponsiveMenu')
// )

const theme = createTheme({
  palette: {
    primary: { main: '#242424' },
    secondary: {
      main: '#c62828',
    },
  },
})

const LandingPage = () => {
  const [scrollbar, setScrollbar] = useState(null)
  const [transparent, setTransparent] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [components, setComponents] = useState(null)
  const [top, setTop] = useState(null)
  const history = useHistory()
  const isRTL = false

  const scrollTo = (e) => {
    e &&
      e.scrollIntoView({
        behavior: 'smooth',
        alignToTop: true,
      })
  }

  const sections = [
    {
      name: 'start',
      onClick: () => history.push('/dashboard'),
    },
    {
      name: 'components',
      onClick: () => {
        setScrolled(true)
        setTimeout(() => {
          scrollTo(components)
        }, 500)
      },
    },
  ]

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        {/* <Helmet>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1, minimal-ui"
          />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta
            name="keywords"
            content={
              'The platform that will allow you to lead and influence'
              
            }
          />
          <meta
            name="description"
            content={
              'React PWA boilerplate that is using create-react-app and firebase '
            }
          />

          <title>You Porazto</title>
        </Helmet> */}
        <Scrollbars
          ref={(e) => {
            if (e !== null) {
              setScrollbar(e)
            }
          }}
          renderView={(props) =>
            isRTL ? (
              <div
                {...props}
                style={{
                  ...props.style,
                  marginLeft: props.style.marginRight,
                  marginRight: 0,
                }}
              />
            ) : (
              <div
                {...props}
                style={{
                  ...props.style,
                }}
              />
            )
          }
          onScroll={(e) => {
            setTransparent(scrollbar.viewScrollTop < 100)
            setScrolled(true)
          }}
          autoHide
          style={{ width: '100%', height: '100vh' }}
        >
          <AppBar
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: transparent ? 'transparent' : undefined,
              boxShadow: transparent ? 'none' : undefined,
              transition: 'background 1s',
            }}
            position="static"
          >
            <Toolbar disableGutters>
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  scrollTo(top)
                }}
              >
                <img
                  src={'/logo-up.png'}
                  alt="logo"
                  style={{
                    height: 35,
                    justifySelf: 'center',
                    color: 'white',
                    marginLeft: 12,
                    display: transparent ? 'none' : undefined,
                  }}
                />
              </div>
              <div style={{ flex: 1 }} />

              <Suspense fallback={<CircularProgress />}>
                {/* <ResponsiveMenu sections={sections} /> */}
              </Suspense>
            </Toolbar>
          </AppBar>
          <div style={{ width: '100%', height: '100%' }}>
            <div
              ref={(r) => r && setTop(r)}
              style={{
                height: '100vh',
                width: '100%',
                backgroundColor: '#232F3E',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
                display: 'flex',
                justifyContent: 'center',
                minHeight: 600,
              }}
            >
              
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <img
                  src={'/logo-up.png'}
                  alt="logo"
                  style={{ height: 150, maxWidth: 280, justifySelf: 'center' }}
                />

                <div style={{ padding: 8 }}>
                  <h3
                    style={{
                      color: '#FEBD69',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 50,
                    }}
                  >
                    <span
                      style={{
                        color: '#820600'
                      }}
                    >YOU </span> 
                     PORAZTO!
                  </h3>

                  <h4
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 25,
                      marginTop: 30,
                    }}
                  >
                    The platform that will allow you to lead and influence
                  </h4>
                  <h4
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 20,
                      marginTop: 20,
                      paddingTop: 20,
                      marginBottom: 40,
                      // opacity: 0.7,
                    }}
                  >
                    At Any Time And Place
                  </h4>
                </div>
              </div>
            </div>
            <div
       style={{
        height: '400px',
        //width: '100%',public\asset\mivzoim10.png
        backgroundImage: 'url(background.webp)',
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
      <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: -80,
              }}
            >
              <Paper
                elevation={3}
                style={{
                  width: '100%',
                  maxWidth: '90%',
                  borderRadius: 15,
                  minHeight: 400,
                }}
              >
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: -50,
                  }}
                >
                  <Button
                    size="large"
                    style={{
                      margin: 30,
                      borderRadius: '40px',
                      fontSize: 'bold',
                    }}
                    aria-label="Start button"
                    variant="contained"
                    color="secondary"
                    name={'signin'}
                    onClick={() => {
                      history.push('/app')
                    }}
                  >
                    Start
                  </Button>
                </div>
                {scrolled && (
                  <Suspense fallback={<CircularProgress />}>
                    <PageContent setComponents={setComponents} />
                  </Suspense>
                )}
              </Paper>
            </div>
            <div style={{ height: 200 }}></div>
            {scrolled && (
              <Suspense fallback={<CircularProgress />}>
                <Footer />
              </Suspense>
            )}
          </div>
        </Scrollbars>
      </React.Fragment>
    </ThemeProvider>
  )
}

export default LandingPage
