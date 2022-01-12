import React, { useState } from "react";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import {
  CardActionArea,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material/";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import { useHistory, useLocation } from "react-router-dom";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";

import { likeStand, deleteStand } from "../../../actions/stands";
import useStyles from "./styles";

const Stand = ({ stand, setCurrentId }) => {
  const [likes, setLikes] = useState(stand?.likes);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedStand = stand.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likeStand(stand._id));
    if (hasLikedStand) {
      setLikes(stand.likes.filter((id) => id !== userId));
    } else {
      setLikes([...stand.likes, userId]);
    }
  };

  const handleShare = () => {
    const fullUrl = window.location.href;
    const targetUrl = `${fullUrl}/${stand._id}`;
    console.log(targetUrl);
    if (navigator.share) {
      navigator
        .share({
          title: `${stand.city}, ${stand.street} | You Porazto`,
          text: `Check out ${stand.street} mivzoim stand on You Porazto App`,
          url: `${fullUrl}/${stand._id}`,
        })
        .then(() => {
          console.log("Successfully shared.");
        })
        .catch((error) => {
          console.error("Something went wrong sharing the blog", error);
        });
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <FavoriteIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <FavoriteBorderOutlinedIcon fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <FavoriteBorderOutlinedIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const handleOpenCard = () => {
    // setCurrentId(stand._id)
    history.push(`/app/stands/${stand._id}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleOpenCard}>
        <CardMedia
          className={classes.media}
          image={
            stand.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={stand.title}
        />
        <div className={classes.overlay}>
          {/* <Typography variant="h6">{stand.creator}</Typography> */}
          <Typography variant="body2">
            {moment(stand.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.details}>
          <Typography
            variant="body2"
            sx={{ m: 1 }}
            color="textSecondary"
            component="h2"
          >
            {stand.city}
          </Typography>
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {stand.street}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {stand.locationDescription}
          </Typography>
        </CardContent>
      </CardActionArea>

      <Button
        color={"primary"}
        fullWidth
        onClick={handleOpenCard}
        sx={{
          mt: 2,
          mb: 4,
          textTransform: "initial",
        }}
      >
        Open Stand Details <ArrowForwardIosRoundedIcon />
      </Button>
      <CardActions className={classes.cardActions}>
        <IconButton
          aria-label="add to favorites"
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes />
        </IconButton>
        <IconButton
          aria-label="add to favorites"
          size="small"
          color="primary"
          onClick={handleShare}
        >
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Stand;
