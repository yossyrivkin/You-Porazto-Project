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
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useHistory, useLocation } from "react-router-dom";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";

import { likeStand, deleteStand } from "../../../../actions/stands";
import useStyles from "./styles";
import ConfirmationDialog from "../Edit/EditAgreeDialog";
import EditAgreeDialog from "../Edit/EditAgreeDialog";

const MyStand = ({ stand, setCurrentId }) => {
  const [likes, setLikes] = useState(stand?.likes);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedStand = stand.likes.find((like) => like === userId);
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  const [openDialogDelete, setOpenDialogDelete] = React.useState(false);

  const handleContinueEdit = () => {
    setOpenDialogEdit(false);
    history.push(`/app/stands/update/${stand._id}`);
  };
  const handleContinueDelete = () => {
    setOpenDialogDelete(false);
    dispatch(deleteStand(stand._id))
    history.push(`/app/stands`);
  };
  const deleteDialogContent = {
    title: `Are you sure you want to delete  "${stand.city}, ${stand.street}"?`,
    desc: `Stand "${stand.city}, ${stand.street}" and all of its content and media will be permanently deleted from the repository`,
  };
  const editDialogContent = {
    title: `Do you want to edit the stand "${stand.city}, ${stand.street}"?`,
    desc: "The changed stand details will be lost from memory and will be replaced by new data",
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
          <Typography variant="body2">
            {moment(stand.createdAt).fromNow()}
          </Typography>
        </div>
        {/* <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={handleOpenCard}><MoreHorizIcon fontSize="default" /></Button>
      </div> */}
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
          onClick={() => setOpenDialogEdit(true)}
        >
          <EditIcon />
        </IconButton>

        <EditAgreeDialog
          dialogContent={editDialogContent}
          open={openDialogEdit}
          setOpen={setOpenDialogEdit}
          handleContinue={handleContinueEdit}
        />
        <EditAgreeDialog
          dialogContent={deleteDialogContent}
          open={openDialogDelete}
          setOpen={setOpenDialogDelete}
          handleContinue={handleContinueDelete}
        />

        <IconButton
          aria-label="delete"
          size="small"
          color="primary"
          onClick={() => setOpenDialogDelete(true)}
        >
          <DeleteIcon />
        </IconButton>

        <IconButton
          aria-label="share"
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

export default MyStand;
