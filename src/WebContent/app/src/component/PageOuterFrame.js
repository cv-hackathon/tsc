import React from "react";
import Stack from "@mui/material/Stack";

import TopToolBar from "./TopToolBar";

export default function PageOuterFrame({
  title,
  enableImport,
  enableExport,
  enableZoom,
  children,
  toolButton,
}) {
  return (
    <Stack
      className="list-panel"
      direction="column"
      spacing={2}
      width="100%"
      px="30px"
      py="10px"
      boxSizing="border-box"
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h1>{title}</h1>
        <div id="meetingSDKElement"></div>
        <TopToolBar
          enableImport={enableImport}
          enableExport={enableExport}
          enableZoom={enableZoom}
          toolButton={toolButton}
        />
      </Stack>
      {children}
    </Stack>
  );
}
