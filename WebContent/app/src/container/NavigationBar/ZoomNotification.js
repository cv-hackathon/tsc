import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from "react-redux"
import doFetch, { getQueryParamsString } from '../../utils/doFetch';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: 'red',
        color: 'red',
        boxShadow: `0 0 0 3px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(1.6)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(3.6)',
            opacity: 0,
        },
    },
}));

export default function Notification() {
    const dispatch = useDispatch();
    const { id: userId } = useSelector(state => state.loginReducer)
    const { notification } = useSelector(state => state.globalInfo)
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
        if(userId) {
            doFetch(`/notification/get/unread${getQueryParamsString({ userId })}`, { method: 'GET' }).then((res => {
                console.log("notification", res)
                dispatch({
                    type: "global_update_notification",
                    notification: {
                        sender: 'Alan',
                        meetingCode: '123456',
                        password: '123456',
                        id: 'test',
                    }
                })
            }))
        }
    }, [userId])

    React.useEffect(() => {
        if (notification && Object.keys(notification)?.length) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [notification])

    const joinMeeting = () => {
        const params = {
            notificationId: notification?.id
        }
        doFetch(`/notification/read${getQueryParamsString(params)}`, {
            method: 'POST',
            data: params
        }).then(res => {
            console.log("read notification", res)
            dispatch({
                type: "global_update_notification",
                notification: {}
            })
        })
    }

    return (
        <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={() => joinMeeting()}>
            <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant={visible ? "dot" : null}
                color="error"
            >
                <Avatar
                    alt="Remy Sharp"
                    src="http://dh1.cmcmcdn.com/sem/8/3/5/a/9/835a9794dc02076ff8ade751a3346358.png"
                    sx={{ height:'28px', width: '28px'}}
                />
            </StyledBadge>
        </IconButton>
    );
}