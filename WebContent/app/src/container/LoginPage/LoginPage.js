import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          width: '100%'
        }}
      >
        <img src="https://images.squarespace-cdn.com/content/v1/6463b4258262847d7b7cb0aa/b5c42c57-0445-400f-bd5b-f31af8810b24/DJI_0090.jpg" width="5271" height="3514" sizes="(max-width:768px)55.265625vw,36.1875vw" style={{ display: 'block', 'objectPosition': '50% 50%', 'objectFit': 'cover', 'width': '100%', 'height': '100%' }} srcSet="https://images.squarespace-cdn.com/content/v1/6463b4258262847d7b7cb0aa/b5c42c57-0445-400f-bd5b-f31af8810b24/DJI_0090.jpg?format=100w 100w, https://images.squarespace-cdn.com/content/v1/6463b4258262847d7b7cb0aa/b5c42c57-0445-400f-bd5b-f31af8810b24/DJI_0090.jpg?format=300w 300w, https://images.squarespace-cdn.com/content/v1/6463b4258262847d7b7cb0aa/b5c42c57-0445-400f-bd5b-f31af8810b24/DJI_0090.jpg?format=500w 500w, https://images.squarespace-cdn.com/content/v1/6463b4258262847d7b7cb0aa/b5c42c57-0445-400f-bd5b-f31af8810b24/DJI_0090.jpg?format=750w 750w, https://images.squarespace-cdn.com/content/v1/6463b4258262847d7b7cb0aa/b5c42c57-0445-400f-bd5b-f31af8810b24/DJI_0090.jpg?format=1000w 1000w, https://images.squarespace-cdn.com/content/v1/6463b4258262847d7b7cb0aa/b5c42c57-0445-400f-bd5b-f31af8810b24/DJI_0090.jpg?format=1500w 1500w, https://images.squarespace-cdn.com/content/v1/6463b4258262847d7b7cb0aa/b5c42c57-0445-400f-bd5b-f31af8810b24/DJI_0090.jpg?format=2500w 2500w" loading="lazy" decoding="async"></img>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome
          </Typography> */}
          <Container sx={{ padding: '0 !important', marginBottom: '2rem' }}>
            <img src='tscLogo.png' style={{ width: '270px'}} />
          </Container>
         <LoginForm />
        </Box>
      </Grid>
    </Grid>
  );
}