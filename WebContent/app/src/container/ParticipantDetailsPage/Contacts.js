import React, {useMemo} from 'react'
import { List, ListItem, ListItemButton, ListItemText, ListItemAvatar, Avatar, Stack, Typography } from '@mui/material';

// function stringToColor(string) {
//   let hash = 0;
//   let i;

//   /* eslint-disable no-bitwise */
//   for (i = 0; i < string.length; i += 1) {
//     hash = string.charCodeAt(i) + ((hash << 5) - hash);
//   }

//   let color = '#';

//   for (i = 0; i < 3; i += 1) {
//     const value = (hash >> (i * 8)) & 0xff;
//     color += `00${value.toString(16)}`.slice(-2);
//   }
//   /* eslint-enable no-bitwise */

//   return color;
// }

// function stringAvatar(name) {
//   return {
//     sx: {
//       bgcolor: stringToColor(name),
//     },
//     children: `${name.split(' ')[0]?.[0]}${name.split(' ')[1] ? name.split(' ')[1][0] : ''}`,
//   };
// }

function Contacts({ participantId, info }) {
  const members = useMemo(() => {
    const workers = info.services.map(it => ({
      name: it.caseWorker,
      role: 'Case Worker',
    }))

    return [{ name: `${info.navigatorName}`, role: 'Navigator' }, ...workers]
  }, [participantId, info])

  return (
    <Stack sx={{ maxWidth: '300px' }} flexGrow={1} direction={"column"}>
      {/* <Typography textAlign={'left'} fontSize={'small'} color={'primary'}>Navigator & Case Workers</Typography> */}
      <List>
        {
          members.map((item, idx) => (
            <ListItem disablePadding key={idx} sx={{display: 'flex', justifyContent: 'space-between'}} >
              <ListItemButton >
                <Stack direction={"row"}>
                  <ListItemAvatar>
                    <Avatar src={`https://ui-avatars.com/api/name=${item.name.split(' ')[1]}&background=random`} sx={{width: 30, height: 30, mr: '10px'}} />
                    {/* <Avatar {...stringAvatar(item.name)} /> */}
                  </ListItemAvatar>
                  <ListItemText primary={item.name} />
                </Stack>
              </ListItemButton>
              <ListItemText secondary={`(${item.role})`} sx={{textAlign: 'right'}} />
            </ListItem>
          ))
        }
      </List>
    </Stack>
  )
}
export default Contacts