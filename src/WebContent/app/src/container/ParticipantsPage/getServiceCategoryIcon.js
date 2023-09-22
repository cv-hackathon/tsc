import React from 'react'
import Avatar from '@mui/material/Avatar';

import ContributeIcon from '../ParticipantDetailsPage/images/contribution.png'
import TargetIcon from '../ParticipantDetailsPage/images/target.png'
import HouseIcon from '../ParticipantDetailsPage/images/house.png'

export default function getServiceCategoryIcon(props) {
  return {
    care: <Avatar src={ContributeIcon}  {...props} />,
    education: <Avatar src={TargetIcon}  {...props} />,
    cabin: <Avatar src={HouseIcon}  {...props} />,
  }
}
