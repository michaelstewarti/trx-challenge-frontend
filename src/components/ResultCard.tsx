import { Avatar, Box, CircularProgress, Grid, GridList, GridListTile } from '@material-ui/core';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { ConsolidatedWeather, LocationSearch } from '../types';
import { dateStringToWeekDayAbb, dateToFullWrittenDate } from '../utils/utils';

const useStyles = makeStyles(theme => ({
  paperResult: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    height: 500
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    height: '100%'
  },
  inline: {
    display: 'inline'
  },
  stateIconLarge: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  noItems: {
    backgroundColor: 'white',
    textAlign: 'center',
    padding: '8px',
    boxSizing: 'border-box',
    borderRadius: '5px',
    '& img': {
      height: '100px',
      width: '100px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      position: 'fixed'
    },
    '& span': {
      top: '60%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      position: 'fixed'
    }
  }
}));

interface Props {
  location: LocationSearch | null;
  locationDay: ConsolidatedWeather | undefined;
  forecast: ConsolidatedWeather[] | undefined;
  date: Date;
}

const ResultCard: React.FC<Props> = ({
  location,
  locationDay,
  forecast,
  date
}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paperResult}>
      <Box p={2} width="100%" height="100%">
        {location && locationDay && locationDay.id && (
          <React.Fragment>
            <Box p={2} width="100%" height="65%">
              <Box p={2} width="100%" height="35%" style={{ color: '#878787' }}>
                <Typography variant="h6" component={'div'}>
                  {location && location.title}
                </Typography>
                <Typography variant="subtitle2" component={'div'}>
                  {location && date && dateToFullWrittenDate(date)}
                </Typography>
                <Typography variant="subtitle1" component={'div'}>
                  {locationDay && locationDay.weather_state_name}
                </Typography>
              </Box>
              <Box p={2} width="100%" height="65%">
                <Grid
                  container
                  style={{ flexGrow: 1, height: '100%' }}
                  spacing={2}
                >
                  <Grid item xs={6} sm={5} md={4} lg={3}>
                    <Box
                      width="100%"
                      height="100%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Avatar
                        alt="Weather state"
                        src={`https://www.metaweather.com/static/img/weather/${locationDay.weather_state_abbr}.svg`}
                        className={classes.stateIconLarge}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={5} md={4} lg={3}>
                    <Box
                      m="auto"
                      width="100%"
                      height="100%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      style={{ color: 'black' }}
                    >
                      <Typography variant="h3" component={'div'}>
                        {Math.trunc(Number(locationDay.the_temp))}
                        &deg;
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box
              p={2}
              width="100%"
              height="35%"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                overflow: 'hidden',
                backgroundColor: 'white'
              }}
            >
              <GridList
                style={{
                  flexWrap: 'nowrap',
                  // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
                  transform: 'translateZ(0)'
                }}
                cols={2.5}
              >
                {forecast && forecast.map(day => (
                  <GridListTile
                    key={day.id}
                    style={{ height: '95%', width: '100px' }}
                  >
                    <Box
                      m="auto"
                      width="100%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      style={{ color: 'black' }}
                    >
                      <Typography variant="body1" component={'div'}>
                        {dateStringToWeekDayAbb(day.applicable_date)}
                      </Typography>
                    </Box>
                    <Box
                      m="auto"
                      width="100%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      style={{ color: 'black' }}
                    >
                      <Avatar
                        alt="Weather state forecast"
                        src={`https://www.metaweather.com/static/img/weather/${day.weather_state_abbr}.svg`}
                      />
                    </Box>
                    <Box
                      m="auto"
                      width="100%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      style={{ color: 'black' }}
                    >
                      <Typography variant="body1" component={'p'}>
                        {Math.trunc(Number(day.max_temp))}
                        &deg;
                      </Typography>
                      <Typography
                        variant="body1"
                        component={'p'}
                        style={{ color: '#878787' }}
                      >
                        {Math.trunc(Number(day.min_temp))}
                        &deg;
                      </Typography>
                    </Box>
                  </GridListTile>
                ))}
              </GridList>
            </Box>
          </React.Fragment>
        )}
        {location && (!locationDay || !locationDay.id) && (
          <Box display="flex" height="100%" width="100%">
            <Box m="auto">
              <CircularProgress color="inherit" size={20} />
            </Box>
          </Box>
        )}
        {!location && (
          <Box className={classes.noItems}>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textSecondary"
            >
              Select a location
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default ResultCard;
