import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './components/Copyright';
import WeatherForecast from './components/WeatherForecast';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    boxShadow: 'none',
    transform: 'none',
    width: '100%'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }
}));

function App() {
  const classes = useStyles();
  return (
    <div>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Weather Forecast
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <WeatherForecast />
        <Copyright />
      </main>
    </div>
  );
}

export default App;
