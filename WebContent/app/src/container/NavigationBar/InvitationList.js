import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import Draggable from "react-draggable";
import { useSelector } from "react-redux";
import doFetch from "../../utils/doFetch";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function InvitationItem({ collapseClick, open, handleToggle, itemText, data }) {
  return (
    <ListItem sx={{ flexDirection: "column" }} alignItems="flex-start">
      <ListItemButton onClick={collapseClick} sx={{ width: "100%" }}>
        <ListItemText primary={itemText} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          {data.map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem key={itemText + value.id} disablePadding>
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(value)}
                  dense
                >
                  <label style={{ display: "flex", "align-items": "center" }}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${value.name}`} />
                  </label>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </ListItem>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "&.MuiDialog-root": {
    "pointer-events": "none",
  },
  "& .MuiPaper-root": {
    "pointer-events": "all",
  },
}));

export default function InvitationList({ meetingInfo }) {
  const [navOpen, setNavOpen] = React.useState(true);
  const [parOpen, setParOpen] = React.useState(true);
  const [navChecked, setNavChecked] = React.useState([]);
  const [parChecked, setParChecked] = React.useState([]);
  const navigatorss = useSelector((state) => state.globalInfo.navigators);
  const organizations = useSelector((state) => state.globalInfo.organizations);
  const login = useSelector((state) => state.loginReducer);
  const navigators = React.useMemo(() => {
    return Object.values(navigatorss).map((v) => ({
      id: v.navigatorId,
      name: v.name,
    }));
  }, [navigatorss]);
  const caseWorkers = React.useMemo(() => {
    const v = [];
    organizations.forEach((org) => {
      org.services.forEach((s) => {
        v.push({
          name: `${s.workerName} - ${org.name}`,
          id: s.id,
        });
      });
    });
    return v;
  }, [organizations]);

  const handleNavToggle = (value) => () => {
    const currentIndex = navChecked.indexOf(value);
    const newChecked = [...navChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setNavChecked(newChecked);
  };

  const handleParToggle = (value) => () => {
    const currentIndex = parChecked.indexOf(value);
    const newChecked = [...parChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setParChecked(newChecked);
  };

  const navigatorCollapseClick = () => {
    setNavOpen(!navOpen);
  };

  const participantCollapseClick = () => {
    setParOpen(!parOpen);
  };

  const handleSentInvitation = () => {
    const receiverIds = navChecked
      .map((v) => v.id)
      .concat(parChecked.map((v) => v.id));
    if (receiverIds.length) {
      doFetch("/notification/send", {
        method: 'POST',
        body: {
            "receiverIds": receiverIds,
            "senderId": login.id,
            "senderName": login.name,
            "zoomCode": meetingInfo.meetingNumber,
            "zoomPassword": meetingInfo.password
        }
      })
    }
  };

  return (
    <BootstrapDialog
      open={true}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      hideBackdrop={true}
      keepMounted
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        Please select people to join the meeting
      </DialogTitle>
      <DialogContent>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <InvitationItem
            data={navigators}
            itemText={"Navigator"}
            collapseClick={navigatorCollapseClick}
            open={navOpen}
            handleToggle={handleNavToggle}
          />
          <InvitationItem
            data={caseWorkers}
            itemText={"Case Worker"}
            collapseClick={participantCollapseClick}
            open={parOpen}
            handleToggle={handleParToggle}
          />
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSentInvitation}
          variant="outlined"
          startIcon={<SendIcon />}
        >
          INVITE
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
