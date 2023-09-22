import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { userLogin } from '../../actions/userActions';
import { useHistory } from 'react-router-dom';
import { CircularProgress, FormHelperText } from '@mui/material';
import { useDispatch } from 'react-redux';
import doFetch, { getQueryParamsString } from '../../utils/doFetch';

function CustomTabPanel(props) {
  const { children, value, index, handleSubmit, loading, authorized, ...other } = props;
  const [checked, setChecked] = React.useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    handleSubmit(data, checked)
  }

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!authorized}
            helperText="Please check your password again."
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" checked={checked} onChange={e => setChecked(e.target.checked)} />}
            label="Remember me"
            id="remember"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? <CircularProgress style={{ height: '20px', width: '20px', marginRight: '0.5rem' }} /> : null}
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function LoginForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [authorized, setAuthorized] = React.useState(true);

  const handleSubmit = React.useCallback((data, rememberMe) => {
    setLoading(true);
    const userInfo = {
      email: data.get("email"),
      password: data.get("password"),
      type: value === 0 ? 'Navigator' : 'Organization'
    }
    doFetch(
      `/login${getQueryParamsString(userInfo)}`,
      {
        method: 'POST',
        body: userInfo,
      }
    ).then((res = {}) => {
      if(res && res.success) {
        Promise.all([doFetch('/navigator'), doFetch('/organization')]).then(([navigators, organizations]) => {
          dispatch({type: 'update_global_info', navigators, organizations})
        })
        userLogin(
          {
            ...userInfo,
            name: res.name,
            id: res.id
          }
        , rememberMe, dispatch)
        setAuthorized(true);
        setTimeout(() => {
          history.push("/home")
          setLoading(false)
        }, 1000)
      } else {
        setLoading(false);
        setAuthorized(false);
      }
    }).catch(err => {
      console.error(err);
      setLoading(false);
      setAuthorized(false);
    });
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setAuthorized(true);
    setLoading(false);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="TSC Worker" {...a11yProps(0)} />
          <Tab label="Organization" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} loading={loading} handleSubmit={handleSubmit} authorized={authorized} />
      <CustomTabPanel value={value} index={1} loading={loading} handleSubmit={handleSubmit} authorized={authorized} />
    </Box>
  );
}