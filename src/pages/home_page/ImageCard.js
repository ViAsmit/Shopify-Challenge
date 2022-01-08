import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import Heart from "react-animated-heart";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard/lib/Component";

export default function ImageCard({ data }) {
  const [isClick, setClick] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [copy, setcopy] = React.useState(false);

  const handleDialog = () => {
    setOpen(!open);
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {data.url}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CopyToClipboard text={data.url} onCopy={() => setcopy(true)}>
            <Button autoFocus>{copy ? "Copied!" : "Copy to Clipboard"}</Button>
          </CopyToClipboard>
        </DialogActions>
      </Dialog>
      <Card sx={{ maxWidth: 345, margin: 2 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {data.title[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={data.title}
          subheader={data.date}
        />
        <CardMedia
          component="img"
          height="194"
          image={data.url}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.primary">
            {data.explanation.substring(0, 500) + "..."}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {/* <IconButton aria-label="add to favorites"> */}
          <Heart
            isClick={isClick}
            onClick={() => setClick(!isClick)}
            style={{ height: "50px" }}
          />
          {/* </IconButton> */}
          <IconButton aria-label="share" onClick={handleDialog}>
            <ShareIcon fontSize="large" />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}
