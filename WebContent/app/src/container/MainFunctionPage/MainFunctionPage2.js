import React from "react";
import { useDispatch } from "react-redux";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import FunctionCard from "./FunctionCard";
import Box from "@mui/material/Box";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import DomainAddOutlinedIcon from "@mui/icons-material/DomainAddOutlined";

import exportFile from "../../utils/exportFile";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const getFunctionConfig = (dispatch) => ({
  Cases: {
    title: 'Import Cases',
    desc: 'Simply drag&drop excel to import all cases into system',
    img: '/import_img.jpeg',
    onClick: () => dispatch({type: 'upload_show'}),
    icon: <ImportExportOutlinedIcon />
  },
  Services: {
    title: 'Export Cases',
    desc: 'Export participants list for easy offline services checking',
    img: '/export_img.jpeg',
    onCick: exportFile,
    icon: <ImportExportOutlinedIcon />
  },
  Participant: {
    title: 'Add Participant',
    desc: 'Onboard participant and book services',
    img: '/homeless.png',
    onClick: () => dispatch({type: 'add_participant_show'}),
    icon: <ExitToAppOutlinedIcon />
  },
  Organization: {
    title: 'Add Organization',
    desc: 'Onboard organization and register services provided',
    img: '/coordinator.png',
    onClick: () => dispatch({type: 'add_organization_show'}),
    icon: <DomainAddOutlinedIcon />
  },
})

export default function MainFunctionPage() {
  const dispatch = useDispatch();
  const funcConfig = getFunctionConfig(dispatch);
  console.log(funcConfig)

  const renderFuncCard = () => {
    return Object.keys(funcConfig).map(type => (
      <FunctionCard 
        iconEle={funcConfig[type].icon}
        header={type}
        title={funcConfig[type].title}
        onClick={funcConfig[type].onCick}
        image={funcConfig[type].img}
        desc={funcConfig[type].desc}
        key={type}
      />
    ))
  }

  return (
    <Box sx={{ height: "100%" }}>
      <div
        className="main"
        style={{
          position: "relative",
          flexGrow: 1,
          width: "100%",
          height: "160px",
          marginBottom: "20px",
          padding: '0.5em',
          background:
            "linear-gradient(0deg, rgba(25, 25, 25, .4), rgba(25, 25, 25, 0.4)), url(https://images.squarespace-cdn.com/content/v1/6463b4258262847d7b7cb0aa/b6d1c9ba-6b65-4aa4-b9c3-f889d4d9bfad/iStock-1357362371.jpg?format=2500w) center / contain",
        }}
      >
        <ThemeProvider theme={theme}>
          <Typography
            gutterBottom
            variant="h3"
            component="h3"
            color="#FFF"
            mt="10px"
            whiteSpace="nowrap"
            xs={{ fontSide: "10px" }}
          >
            The Springboard Collaborative
          </Typography>
          <Typography color="#FFF">
            A statewide Delaware nonprofit building dignified dwellings and communities that foster well-being for Delawareans in greatest need, concurrently connecting compromised populations with community resources to build a better life.  
          </Typography>
        </ThemeProvider>
      </div>
      <div id="meetingSDKElement"></div>
      <Stack spacing={2} direction="row" alignItems='center' width='100%' justifyContent='space-around' useFlexGap flexWrap="wrap">
        <FunctionCard iconEle={<ImportExportOutlinedIcon />} header='Cases' title="Import Cases" onClick={() => dispatch({type: 'upload_show'})} image={'/import_img.jpeg'}/>
        <FunctionCard iconEle={<ExitToAppOutlinedIcon />} header='Services' title="Export Cases" onClick={() => dispatch({type: 'export_show'})} image={'/export_img.jpeg'}/>
        <FunctionCard iconEle={<PersonAddOutlinedIcon />} header='Homeless' title="Add Participant" onClick={() => dispatch({type: 'add_participant_show'})} image={'/homeless.png'}/>
        <FunctionCard iconEle={<DomainAddOutlinedIcon />} header='Coordinator' title="Add Organization" onClick={() => dispatch({type: 'add_organization_show'})} image={'/coordinator.png'}/>
      </Stack>
    </Box>
  );
}
