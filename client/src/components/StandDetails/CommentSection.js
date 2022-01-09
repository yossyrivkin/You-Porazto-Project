import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@mui/material/";
import { useDispatch } from "react-redux";

import { commentStand } from "../../actions/stands";
import useStyles from "./styles";
import { Box } from "@mui/system";

const CommentSection = ({ stand }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const [comments, setComments] = useState(stand?.comments);
  const classes = useStyles();
  const commentsRef = useRef();

  const handleComment = async () => {
    const newComments = await dispatch(
      commentStand(`${user?.result?.name}: ${comment}`, stand._id)
    );

    setComment("");
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box>
      <Box
        sx={{
          // display: 'flex',
          // justifyContent: "space-between",
        }}
      >
        <Typography gutterBottom variant="h6">
          Comments
        </Typography>

        <Box
          sx={{
            height: "200px",
            overflowY: "auto",
            // marginRight: "30px",
            mx: 2, 
            mb: 2 
          }}
        >
            {!comments.length ?
               <Typography variant="subtitle1">
                 No comments yet.    Be the first to write a comment..
               </Typography>
            : comments?.map((c, i) => (
              <Typography key={i} gutterBottom variant="subtitle1">
                <strong>{c.split(": ")[0]}</strong>
                {c.split(":").slice(1)}
              </Typography>
            ))}
          <Box ref={commentsRef} />
        </Box>
        <Box>
          <Typography gutterBottom variant="h6">
            Write a comment
          </Typography>
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            label="Comment"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          <Button
            style={{ marginTop: "10px" }}
            fullWidth
            disabled={!comment.length}
            color="primary"
            variant="contained"
            onClick={handleComment}
          >
            Comment
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CommentSection;
