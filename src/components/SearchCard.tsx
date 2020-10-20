import { Box, CircularProgress, Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { LocationSearch } from '../types';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  }
}));

interface Props {
  location: LocationSearch | null;
  setLocation: React.Dispatch<React.SetStateAction<LocationSearch | null>>;
  locationSearch: LocationSearch[];
  setLocationQuery: React.Dispatch<React.SetStateAction<string>>;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  isSearching: boolean;
}

const SearchCard: React.FC<Props> = ({
  location,
  setLocation,
  locationSearch,
  setLocationQuery,
  date,
  setDate,
  isSearching
}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Grid container justify="space-around" alignContent={'center'}>
        <Autocomplete
          id="location"
          value={location}
          onChange={(
            event: React.ChangeEvent<{}>,
            value: LocationSearch | null
          ) => {
            setLocation(value);
          }}
          options={locationSearch}
          getOptionLabel={(option: LocationSearch) => option.title}
          getOptionSelected={(option: any, value: any) =>
            option && value && option.woeid === value.woeid
          }
          style={{ width: 300 }}
          loading={isSearching}
          loadingText={
            <Box display="flex">
              <Box m="auto">
                <CircularProgress color="inherit" size={20} />
              </Box>
            </Box>
          }
          renderInput={(params: any) => (
            <TextField
              {...params}
              margin={'normal'}
              label="Location"
              variant="outlined"
              onChange={(event: any) => {
                setLocationQuery(event.target.value);
              }}
            />
          )}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date"
            value={date}
            onChange={(value: Date | null) => value && setDate(value)}
            style={{ width: 300 }}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>
    </Paper>
  );
};

export default SearchCard;
