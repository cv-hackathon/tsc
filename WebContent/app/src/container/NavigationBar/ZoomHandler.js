import * as React from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { createSvgIcon } from "@mui/material";

import ZoomMtgEmbedded from "@zoomus/websdk/embedded";

import ZoomPopover from "./Popover";
import InvitationList from "./InvitationList";
import doFetch, { getQueryParamsString } from "../../utils/doFetch";

const meetingNumber = "3936529619";

const ZoomIcon = createSvgIcon(
  <svg
    width="34"
    height="34"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M34.1113 17C34.1113 18.8179 33.9652 20.6005 33.686 22.3386C32.7618 28.0926 28.2039 32.6505 22.4499 33.5747C20.7117 33.8538 18.9291 34 17.1113 34C15.2935 34 13.5109 33.8538 11.7728 33.5747C6.01875 32.6505 1.46083 28.0926 0.53666 22.3386C0.257486 20.6005 0.111328 18.8179 0.111328 17C0.111328 15.1821 0.257486 13.3995 0.53666 11.6614C1.46083 5.90736 6.01875 1.3495 11.7728 0.425329C13.5109 0.146156 15.2935 0 17.1113 0C18.9291 0 20.7117 0.146156 22.4499 0.425329C28.2039 1.3495 32.7618 5.90736 33.686 11.6614C33.9652 13.3995 34.1113 15.1821 34.1113 17Z"
      fill="#0B5CFF"
    ></path>
    <path
      d="M34.1113 17C34.1113 18.8179 33.9652 20.6005 33.686 22.3386C32.7618 28.0926 28.2039 32.6505 22.4499 33.5747C20.7117 33.8538 18.9291 34 17.1113 34C15.2935 34 13.5109 33.8538 11.7728 33.5747C6.01875 32.6505 1.46083 28.0926 0.53666 22.3386C0.257486 20.6005 0.111328 18.8179 0.111328 17C0.111328 15.1821 0.257486 13.3995 0.53666 11.6614C1.46083 5.90736 6.01875 1.3495 11.7728 0.425329C13.5109 0.146156 15.2935 0 17.1113 0C18.9291 0 20.7117 0.146156 22.4499 0.425329C28.2039 1.3495 32.7618 5.90736 33.686 11.6614C33.9652 13.3995 34.1113 15.1821 34.1113 17Z"
      fill="url(#paint0_radial_5312_25321)"
    ></path>
    <path
      d="M34.1112 17C34.1112 18.8179 33.9651 20.6005 33.6859 22.3386C32.7617 28.0926 28.2038 32.6505 22.4498 33.5746C20.7116 33.8538 18.9291 34 17.1113 34C15.2935 34 13.5109 33.8538 11.7727 33.5746C6.01863 32.6505 1.46077 28.0926 0.536599 22.3386C0.257426 20.6004 0.111328 18.8179 0.111328 17C0.111328 15.1822 0.257426 13.3995 0.536599 11.6613C1.46083 5.90737 6.01869 1.34938 11.7727 0.425271C13.5109 0.146098 15.2934 0 17.1113 0C18.9291 0 20.7117 0.146098 22.4498 0.425271C28.2039 1.34938 32.7617 5.90737 33.6859 11.6613C33.9651 13.3995 34.1112 15.182 34.1112 17Z"
      fill="url(#paint1_radial_5312_25321)"
    ></path>
    <path
      d="M20.7556 21.2499C20.7556 22.2558 19.9401 23.0713 18.9342 23.0713H11.0413C9.02939 23.0713 7.39844 21.4404 7.39844 19.4285V12.7499C7.39844 11.744 8.21392 10.9285 9.21987 10.9285H17.1127C19.1246 10.9285 20.7556 12.5594 20.7556 14.5713V21.2499ZM25.3699 12.0212L22.6984 14.0248C22.2398 14.3688 21.9699 14.9086 21.9699 15.482L21.9699 18.5177C21.9699 19.091 22.2399 19.6308 22.6985 19.9748L25.3699 21.9784C25.9703 22.4286 26.827 22.0003 26.827 21.2498V12.7498C26.827 11.9993 25.9703 11.5709 25.3699 12.0212Z"
      fill="white"
    ></path>
    <defs>
      <radialGradient
        id="paint0_radial_5312_25321"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(17.1113 15.0244) scale(22.9205 19.1565)"
      >
        <stop offset="0.82" stopColor="#0B5CFF" stopOpacity="0"></stop>
        <stop offset="0.98" stopColor="#003CB3"></stop>
      </radialGradient>
      <radialGradient
        id="paint1_radial_5312_25321"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(17.1113 18.9685) scale(22.9122 19.1496)"
      >
        <stop offset="0.8" stopColor="#0B5CFF" stopOpacity="0"></stop>
        <stop offset="1" stopColor="#71A5F1"></stop>
      </radialGradient>
    </defs>
  </svg>,
  "ZOOM"
);

export default function ZoomHandler() {
  const dispatch = useDispatch();
  const [popAnchorEl, setPopAnchorEl] = React.useState(null);
  const [ignore, setIgnore] = React.useState(false);
  const [meetingInfo, setMeetingInfo] = React.useState(null);
  const [showInvitation, setShowInvitation] = React.useState(false);
  const login = useSelector((state) => state.loginReducer);
  const notification = useSelector((state) => state.globalInfo.notification);
  const TOKENS = React.useRef({});
  const notificationInterval = React.useRef();

  function getTokens() {
    return fetch("https://8tv5gfes62.us-east-1.awsapprunner.com/tokens", {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        TOKENS.current = res;
      });
  }

  React.useEffect(() => {
    getTokens();
  }, []);

  const refreshNotification = (userId) => {
    doFetch(`/notification/get/unread${getQueryParamsString({ userId })}`, {
      method: "GET",
    }).then((res) => {
      console.log("notification", res);
      if (res?.[0]?.id) {
        const info = res[0];
        dispatch({
          type: "global_update_notification",
          notification: {
            ...info,
          },
        });
      }
    });
  };

  React.useEffect(() => {
    if (login?.id) {
      refreshNotification(login.id);
      notificationInterval.current = setInterval(() => {
        refreshNotification(login.id);
      }, 3000);
    }
    return () => {
      if (login?.id && notificationInterval.current) {
        clearInterval(notificationInterval.current);
      }
    };
  }, [login?.id]);

  const handleZoomPopoverShow = (event) => {
    setPopAnchorEl(event.currentTarget);
  };

  const handleZoomPopoverClose = (event) => {
    setPopAnchorEl(null);
  };

  const handleIgnore = () => {
    setIgnore(true);
    handleZoomPopoverClose();
  };

  const hostMeeting = () => {
    // getSignature(1);
    const now = Date.now();
    if (
      TOKENS.current.accessTokenExpire > now &&
      TOKENS.current.zakExpire > now
    ) {
      if (TOKENS.current["signatureExpire1"] > new Date().getTime()) {
        startMeeting(TOKENS.current["signature1"], 1);
      } else {
        getSignature(1);
      }
    } else {
      window.open(
        "https://8tv5gfes62.us-east-1.awsapprunner.com",
        "_blank",
        "popup=1,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400,height=350"
      );

      function poll() {
        setTimeout(() => {
          getTokens().then(() => {
            if (
              TOKENS.current.accessTokenExpire > now &&
              TOKENS.current.zakExpire > now
            ) {
              hostMeeting();
            } else {
              poll();
            }
          });
        }, 1000);
      }

      poll();
    }
  };

  const onJoinZoomClick = () => {
    const params = {
      notificationId: notification?.id,
    };
    doFetch(`/notification/read${getQueryParamsString(params)}`, {
      method: "POST",
      data: params,
    }).then((res) => {
      console.log("read notification", res);
      if (
        TOKENS.current &&
        TOKENS.current["signatureExpire0"] > new Date().getTime()
      ) {
        startMeeting(TOKENS.current["signature0"], 0);
      } else {
        getSignature(0);
      }
      dispatch({
        type: "global_update_notification",
        notification: {},
      });
      handleZoomPopoverClose();
    });
  };

  function getSignature(role) {
    fetch("https://8tv5gfes62.us-east-1.awsapprunner.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role, // 0 = join, 1 = host
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        TOKENS.current["signature" + role] = response.signature;
        TOKENS.current["signatureExpire" + role] = response.expire;
        startMeeting(TOKENS.current["signature" + role], role);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function startMeeting(signature, role) {
    const client = ZoomMtgEmbedded.createClient();
    let meetingSDKElement = document.getElementById("meetingSDKElement");
    client.init({
      zoomAppRoot: meetingSDKElement,
      language: "en-US",
      debug: true,
    });
    console.log(client);
    client
      .join({
        sdkKey: "igAyksSsQGi7ImBX_jdMHQ",
        signature: signature,
        meetingNumber: role === 1 ? meetingNumber : notification.zoomCode,
        password: role === 1 ? "Qf8fs8" : notification.zoomPassword,
        userName: login.name,
        zak: TOKENS.current.zak,
      })
      .then((e) => {
        console.log(e);
        const meetingInfo = client.getCurrentMeetingInfo();
        console.log(meetingInfo);
        const isHost = client.isHost();
        if (isHost) {
          console.log(role);
          setShowInvitation(true);
          setMeetingInfo(meetingInfo);
          client.on("connection-change", (payload) => {
            if (payload.state === "Closed") {
              console.log("Meeting ended");
              setShowInvitation(false);
              setMeetingInfo(null);
            }
          });
        }
      })
      .catch((e) => {
        console.log("zoom error", e);
      });
  }

  return (
    <>
      {login.type === "Navigator" ? (
        <Button
          disabled={meetingInfo ? true : false}
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "#304ffe",
          }}
          onClick={hostMeeting}
          startIcon={<ZoomIcon />}
        >
          Host Meeting
        </Button>
      ) : null}
      {!ignore && notification?.zoomCode ? (
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "#304ffe",
            marginLeft: "0.75rem",
          }}
          onClick={onJoinZoomClick}
          startIcon={<ZoomIcon />}
          className="heartbeat"
          onMouseOver={handleZoomPopoverShow}
        >
          Join a Meeting
        </Button>
      ) : null}
      <ZoomPopover
        sender={notification?.senderName}
        anchorEl={popAnchorEl}
        handleClose={handleZoomPopoverClose}
        handleIgnore={handleIgnore}
      />
      {showInvitation && <InvitationList meetingInfo={meetingInfo} />}
    </>
  );
}
