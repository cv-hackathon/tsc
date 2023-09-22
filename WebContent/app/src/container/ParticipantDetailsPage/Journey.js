import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';

import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import ServiceSection from './ServiceSection';
import Indicators from './Indicators';

import { Avatar } from '@mui/material';
import UserIcon from './images/user.png'
import HouseIcon from './images/house.png'
import ContributeIcon from './images/contribution.png'
import TargetIcon from './images/target.png'
import HomeIcon from './images/home.png'
import GoalIcon from './images/goal.png'

const STEPS = [{
  label: 'IDENTIFICATION',
  step: 0,
  key: 'identification',
}, {
  label: 'SPRINGBOARD PALLET VILLAGES',
  step: 1,
  key: 'cabin',
}, {
  label: 'ACCESS COORDINATED CARE',
  step: 2,
  key: 'care',
}, {
  label: 'EDUCATION & EMPLOYMENT',
  step: 3,
  key: 'education',
}, {
  label: 'SPRINGBOARD COTTAGE COMMUNITIES',
  step: 4,
  key: 'communities'
}, {
  label: 'STABILITY, HEALTH & SELF SUFFICIENCY',
  step: 5,
  key: 'final'
}]

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.status === 0 && (ownerState.active || ownerState.completed) && {
    backgroundImage:
      'linear-gradient( 136deg, #1f7dda 0%, #75a9de 50%, #1976d2 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.status === 1 && (ownerState.active || ownerState.completed) && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(236,199,131) 0%, rgb(229,186,52) 50%, rgb(227,147,12) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.status === 2 && (ownerState.completed) && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(122,223,136) 0%, rgb(92,194,92) 50%, rgb(61,144,31) 100%)',
  }),
  ...(ownerState.exit === 'Y' && ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, #da2d1f 0%, #f44336 50%, #d21919 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className, category: { status, info: { exit } } } = props;

  const icons = {
    1: <Avatar src={UserIcon} />,
    2: <Avatar src={HouseIcon} />,
    3: <Avatar src={ContributeIcon} />,
    4: <Avatar src={TargetIcon} />,
    5: <Avatar src={HomeIcon} />,
    6: <Avatar src={GoalIcon} />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active, status, exit }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

export default function CustomizedSteppers({ info }) {
  const categories = useMemo(() => STEPS.map(it => {
    const {services, ...restInfo} = info
    const filteredServices = services.filter(s => s.serviceCategory === it.key)
    
    return {
      ...it,
      services: filteredServices,
      info: restInfo,
      status: filteredServices.length > 0 && filteredServices.every(it => it.serviceStatus?.toLowerCase() === 'open') ?
        0
        :
        (filteredServices.length === 0 || filteredServices.every(it => it.serviceStatus?.toLowerCase() === 'completed')) ? 2 : 1,
    }
  }), [info])

  const activeStep = useMemo(() => {
    if (info.status.toLowerCase() === 'completed') {
      return 5
    } else if (info.status === 'Registered') {
      return 1
    } else {
      return Math.max(...(categories.filter(c => c.services?.length > 0).map(c => c.step)))
    }
  }, [info, categories]) 
  
  return (
    <Stack sx={{ width: '100%', position: 'relative' }} spacing={2}>
        <Indicators />
        <ServiceSection categories={categories} />
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />} >
          {STEPS.map(({ label }, idx) => (
            <Step key={label}>
              <StepLabel StepIconComponent={(props) => <ColorlibStepIcon category={categories[idx]} {...props} />}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
  );
}