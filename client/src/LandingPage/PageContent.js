import React from 'react'
import PublicIcon from '@mui/icons-material/Public';
import CallMergeIcon from '@mui/icons-material/CallMerge';
import {
  CheckCircleOutline as CheckCircleOutlineIcon,
  TrackChanges,
  FileCopy,
  SupervisorAccountIcon,
  CallMerge,
} from '@mui/icons-material'
import {
  Tooltip,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
} from '@mui/material'
import { withStyles } from '@mui/styles'
import { lighten, darken } from '@mui/material/styles'

const LightTooltip = withStyles((theme) => {
  const getBackgroundColor = theme.palette.type === 'light' ? lighten : darken
  return {
    tooltip: {
      ...theme.typography.body2,
      borderRadius: theme.shape.borderRadius,
      display: 'flex',
      padding: '6px 10px',
      backgroundColor: getBackgroundColor(theme.palette.success.main, 0.1),
    },
  }
})(Tooltip)

const PackageCard = ({ title, description, icons }) => {
  const [open, setOpen] = React.useState(false)
  const handleClick = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Card elevation={4} style={{ margin: 18, maxWidth: 350 }}>
      <CardContent>
        <Typography gutterBottom variant="h4" component="h2">
          {title}
        </Typography>
        {icons}
        <br />
          {/* <Tooltip */}
        <Typography variant="body2" component="div">
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}

const PageContent = ({ setComponents }) => {
  return (
    <React.Fragment>
      <div style={{ height: 20 }} />
      <Typography
        variant="h3"
        //color="textSecondary"
        style={{ margin: 16, textAlign: 'center' }}
      >
        Every Jew is a Shliach!
      </Typography>
      <Typography
        variant="h5"
        component="div"
        color="textSecondary"
        style={{ margin: 16, textAlign: 'center' }}
      >
        Making the world of shlichus accessible to everyone! Providing the opportunity for business owners to be active partners in spreading Torah and Yidishkeit in their natural environment
      </Typography>
      <div style={{ height: 30 }} />

      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'space-around',
          flexWrap: 'wrap',
        }}
      >
        <PackageCard
          title={'Solution for Shluchim'}
          description={
            `From today, it is easy and convenient to recruit activists for Mivtza Tefillin on Friday, for the Lag B'Omer procession, for Mivtza Hanukkah or for distributing food to the needy.
            .`
          }
          icons={
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              <img
                src="/asset/images/DLszkIOW4AECizC.jpg"
                alt="react"
                style={{ width: '100%', height: '200px', objectFit: 'cover',}}
              />
              {/* <PublicIcon
                style={{ width : 50, aspectRatio: 1.11 }}

              /> */}
            </div>
          }
        />
        <PackageCard
          title={'Accessibility for Anash'}
          description={
            `Your dream to incorporate the mission into daily life can come true. Even if you did not win to become a Shliach in the full sense, now you have the opportunity to participate in your body, act and influence.
            .`
          }
          icons={
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              <img
                src="/asset/images/Chabad1161.jpeg"
                alt="react"
                style={{ width: '100%', height: '200px', objectFit: 'cover',}}
              />
              {/* <PublicIcon
                style={{ width : 50, aspectRatio: 1.11 }}

              /> */}
            </div>
          }
        />
        <PackageCard
          title={'Everything in one place'}
          description={
            `From today, it is easy and convenient to recruit activists for Mivtza Tefillin on Friday, for the Lag B'Omer procession, for Mivtza Hanukkah or for distributing food to the needy.
            .`
          }
          icons={
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              <img
                src="/asset/images/mivzoim10.jpg"
                alt="react"
                style={{ width: '100%', height: '200px', objectFit: 'cover',}}
              />
              {/* <PublicIcon
                style={{ width : 50, aspectRatio: 1.11 }}

              /> */}
            </div>
          }
        />
      </div>
      <div style={{ height: 30 }} />
      <div
        ref={(r) => {
          if (r) {
            setComponents(r)
          }
        }}
        style={{
          //height: 400,
          backgroundColor: '#2D2D2D',
          backgroundImage: 'radial-gradient( #4F4F4F,#242424)',
        }}
      >
        <div style={{ height: 30 }} />
        <Typography
          variant="h3"
          //color="textSecondary"
          style={{ margin: 16, textAlign: 'center', color: 'white' }}
        >
          To go on Shlichus
        </Typography>
        <Typography
          variant="h5"
          component="div"
          style={{ margin: 16, textAlign: 'center', color: 'grey' }}
        >
          Within your contemporary practical reality.
        </Typography>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <CallMerge   style={{ fontSize: 150, color: 'white' }} />
        </div>
        <Typography
          variant="h5"
          component="div"
          style={{ margin: 16, textAlign: 'center', color: 'grey' }}
        >
          Your dream to incorporate the mission into daily life can come true. Even if you did not win to become a Shliach in the full sense, you now have the opportunity to participate in your body, act and influence.
        </Typography>
        <div style={{ height: 50 }} />
      </div>

      <div style={{ height: 30 }} />
      <Typography
        variant="h3"
        //color="textSecondary"
        style={{ margin: 16, textAlign: 'center' }}
      >
        Especially For You
      </Typography>
      <Typography
        variant="h5"
        component="div"
        color="textSecondary"
        style={{ margin: 16, textAlign: 'center' }}
      >
        The platform developed especially for you, to leverage your practical environment for the Shlichus revolution
      </Typography>
      <div style={{ height: 30 }} />
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }}
      >
        <img src="asset/images/nearby-512.png" alt="icon-you" style={{ width: 150 }} />
      </div>
      <div style={{ height: 50 }} />
    </React.Fragment>
  )
}

export default PageContent
