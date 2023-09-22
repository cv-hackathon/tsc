import React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function FunctionCard({onClick, title}) {
  return (
    <Button sx={{ textTransform: 'uppercase', width: '100%', backgroundColor: '#3f6ce5', width: 180, height: 150, color: '#FFF'}} onClick={onClick}>{title}</Button>
  )
}
