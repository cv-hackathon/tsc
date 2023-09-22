import React, {Fragment} from 'react'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import {dayFormat} from '../../utils/constants'

const infos = [
  ['First name', 'firstname'],
  ['Last name', 'lastname'],
  ['Gender', 'gender'],
  ['Birthday', 'birthday'],
  ['Phone', 'phone'],
  ['Registration date', 'registrationTime'],
  ['Navigator', 'navigator'],
  ['Needs', 'needs'],
  ['Tags', 'tags'],
]

export default function Review({title, data}) {
  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Name" />
          <Typography variant="body2">{`${data.firstname} ${data.lastname}`}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Gender" />
          <Typography variant="body2">{data.gender}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Birthday" />
          <Typography variant="body2">{dayjs(data.birthday).format(dayFormat)}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Phone" />
          <Typography variant="body2">{data.phone}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Registration date" />
          <Typography variant="body2">{dayjs(data.registrationTime).format(dayFormat)}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Navigator" />
          <Typography variant="body2">{data.navigator}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Tags" />
          <Typography variant="body2">{data.tags.join(',')}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Needs" />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText primary={data.needs} />
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Services" />
        </ListItem>        
      </List>
    </Fragment>
  )
}
