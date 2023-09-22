import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Most Served Organization</Title>
      <Typography component="p" variant="h4">
        34.6%
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        xxxx
      </Typography>
    </React.Fragment>
  );
}