import 'date-fns';
import axios, { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import useSWR from 'swr/esm/use-swr';
import { ConsolidatedWeather, LocationSearch } from '../types';
import { dateToUriDate } from '../utils/utils';
import SearchCard from './SearchCard';
import ResultCard from './ResultCard';

const fetchLocationData = (woeid: number | null, date: Date) => {
  if (woeid) {
    return axios
      .all<AxiosResponse<ConsolidatedWeather[]>>([
        axios.get<ConsolidatedWeather[]>(
          `/api/location/${woeid}/${dateToUriDate(date)}/`
        ),
        axios.get<ConsolidatedWeather[]>(
          `/api/location/${woeid}/${dateToUriDate(date, 1)}/`
        ),
        axios.get<ConsolidatedWeather[]>(
          `/api/location/${woeid}/${dateToUriDate(date, 2)}/`
        ),
        axios.get<ConsolidatedWeather[]>(
          `/api/location/${woeid}/${dateToUriDate(date, 3)}/`
        ),
        axios.get<ConsolidatedWeather[]>(
          `/api/location/${woeid}/${dateToUriDate(date, 4)}/`
        ),
        axios.get<ConsolidatedWeather[]>(
          `/api/location/${woeid}/${dateToUriDate(date, 5)}/`
        )
      ])
      .then(
        axios.spread((...responses) => {
          return responses
            .filter(
              (response: any) =>
                response && response.data.length && response.data[0]
            )
            .map((response: any) => response.data[0]);
        })
      );
  }
  return Promise.resolve([]);
};

const fetchLocationSearchData = (query: string | null) => {
  if (query) {
    const url = `/api/location/search/?query=${query}`;
    return axios.get<LocationSearch[]>(url);
  }
  return Promise.resolve([]);
};

const WeatherForecast: React.FC<any> = () => {
  const [locationQuery, setLocationQuery] = useState<string>('');
  const [location, setLocation] = useState<LocationSearch | null>(null);
  const [date, setDate] = React.useState<Date>(new Date());

  const { data: forecast } = useSWR<ConsolidatedWeather[]>(
    [location && location.woeid, dateToUriDate(date)],
    // @ts-ignore
    fetchLocationData,
    { initialData: [], revalidateOnMount: true }
  );

  const { data: locationSearchResponse, isValidating: isSearching } = useSWR<
    LocationSearch[]
  >(
    [locationQuery],
    // @ts-ignore
    fetchLocationSearchData,
    { initialData: null }
  );

  const locationDay: ConsolidatedWeather | undefined = forecast && forecast[0];
  const locationSearch: LocationSearch[] =
    (locationSearchResponse && locationSearchResponse.data) || [];

  return (
    <React.Fragment>
      <SearchCard
        location={location}
        setLocation={setLocation}
        locationSearch={locationSearch}
        setLocationQuery={setLocationQuery}
        date={date}
        setDate={setDate}
        isSearching={isSearching}
      />
      <ResultCard
        location={location}
        locationDay={locationDay}
        forecast={forecast && forecast.slice(1)}
        date={date}
      />
    </React.Fragment>
  );
};

export default WeatherForecast;
