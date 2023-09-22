import * as React from "react";
import { Popover, Typography, Button, Stack } from "@mui/material";
import NotificationsPausedIcon from "@mui/icons-material/NotificationsPaused";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapPopver = styled(Popover)(({ theme }) => ({
  "&.MuiPopover-root": {
    "pointer-events": "none",
  },
  "& .MuiPaper-root": {
    "pointer-events": "all",
  },
}));

export default function ZoomPopover({
  anchorEl,
  handleClose,
  handleIgnore,
  sender,
}) {
  const open = Boolean(anchorEl);
  return (
    <BootstrapPopver
      anchorEl={anchorEl}
      id="zoom-notification"
      open={open}
      onClose={handleClose}
      sx={{
        mt: 1.5,
        overflow: "visible",
        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      disableRestoreFocus
    >
      <IconButton
        aria-label="close"
        color="error"
        sx={{ marginLeft: "calc(100% - 42px)", marginTop: "2px" }}
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
      <Stack
        direction={"column"}
        justifyContent={"center"}
        alignItems={"end"}
        spacing={3}
        p={2}
      >
        <Typography>{`${sender} invite you to join a meeting`}</Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleIgnore}
          startIcon={<NotificationsPausedIcon />}
        >
          DISMISS
        </Button>
      </Stack>
    </BootstrapPopver>
  );
}
