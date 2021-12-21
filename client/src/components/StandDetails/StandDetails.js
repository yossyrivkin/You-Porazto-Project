import React, { useEffect } from "react";
import { Paper, Typography, CircularProgress, Divider, Avatar } from "@mui/material/";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useHistory, Link } from "react-router-dom";

import { getStand, getStandsBySearch } from "../../actions/stands";
import CommentSection from "./CommentSection";
import useStyles from "./styles";
import StandMap from "./StandMap";
import { Box } from "@mui/system";
import { pink, purple } from "@mui/material/colors";
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ContactsIcon from '@mui/icons-material/Contacts';
import CallIcon from '@mui/icons-material/Call';

const Stand = () => {
  const { stand, stands, isLoading } = useSelector((state) => state.stands);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getStand(id));
  }, [id]);

  useEffect(() => {
    if (stand) {
      dispatch(
        getStandsBySearch({ search: "none", tags: stand?.tags.join(",") })
      );
    }
  }, [stand]);

  if (!stand) return null;

  const openStand = (_id) => history.push(`/stands/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedStands = stands.filter(({ _id }) => _id !== stand._id);

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexWrap: { xs: "wrap" },
          flexDirection: { xs: "column" },
        }}
      >
        <Box
          xs={{
            borderRadius: "20px",
            margin: "10px",
            flex: 1,
          }}
        >
          <Typography variant="h3" component="h2">
            {stand.street}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {stand.city ||
              stand.tags.map((tag) => (
                <Link
                  to={`/tags/${tag}`}
                  style={{ textDecoration: "none", color: "#3f51b5" }}
                >
                  {` #${tag} `}
                </Link>
              ))}
          </Typography>
          <Typography variant="h6">
            Powered by:
            <Link
              // to={`/creators/${stand.name}`}
              style={{ textDecoration: "none", color: "#3f51b5" }}
            >
              {` ${stand.firstName} ${stand.lastName}`}
            </Link>
          </Typography>
          <Typography variant="body1">
            {moment(stand.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>{stand.locationDescription}</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <StandMap location={stand.location} />
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="h6">Contact Details:</Typography>
          <Box
            sx={{
              ml: 2,
              p: 1,
              display: 'flex',
            }}
          >
            <Avatar sx={{ bgcolor: pink[500], mr:1 }}>
              <ContactsIcon />
            </Avatar>
            <Typography variant="subtitle1">{` ${stand.firstName} ${stand.lastName}`}</Typography>
          </Box>
          <Box
            sx={{
              ml: 2,
              p: 1,
              display: 'flex',
            }}
          >
            <Avatar sx={{ bgcolor: pink[500], mr:1 }}>
              <CallIcon />
            </Avatar>
            <Typography variant="subtitle1"> {stand.phone}</Typography>
          </Box>

          <Divider style={{ margin: "20px 0" }} />
          <CommentSection stand={stand} />
          <Divider style={{ margin: "20px 0" }} />
        </Box>
        <Box
          sx={{
            ml: { xs: 0, sm: 3 },
          }}
        >
          <img
            className={classes.media}
            src={
              stand.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={stand.title}
          />
        </Box>
      </Box>
      {!!recommendedStands.length && (
        <Box
          sx={{
            borderRadius: "20px",
            margin: "10px",
            flex: 1,
          }}
        >
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column" },
            }}
          >
            {recommendedStands.map(
              ({ title, name, message, likes, selectedFile, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openStand(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes.length}
                  </Typography>
                  <img src={selectedFile} width="200px" />
                </div>
              )
            )}
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default Stand;
