import React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function FunctionCard({onClick, image, title, iconEle, header, desc}) {
  return (
    <Card
      sx={{ display: 'flex', flexDirection: 'column', cursor: 'pointer',  width: '20%', minWidth: '240px', maxWidth: '400px'}}
      onClick={onClick}
    >
      <CardMedia
        component="div"
        sx={{
          pt: '56.25%',
        }}
        image={image ?? "https://source.unsplash.com/random?wallpapers"}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h5">
          {header ?? 'Heading'}
        </Typography>
        <Typography>
         { desc ?? 'You can use this section to describe the content.'}
        </Typography>
      </CardContent>
      <CardActions sx={{ flexShrink: 1 }}>
        <Button startIcon={iconEle} variant="outlined" color='primary' sx={{textTransform: 'uppercase', width: '100%'}}>{title}</Button>
      </CardActions>
    </Card>
  )
}
