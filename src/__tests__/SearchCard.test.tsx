import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// eslint-disable-next-line import/no-extraneous-dependencies
import { wait } from '@testing-library/dom';
import SearchCard from '../components/SearchCard';
import { mockLocationSearch } from '../utils/constants';

test('Location search works when user types a query and clicks suggested option', () => {
  const mockSetDate = jest.fn(() => undefined);
  const mockSetLocation = jest.fn(() => undefined);
  const mockSetLocationQuery = jest.fn(() => undefined);
  const now = new Date();

  const { getByLabelText, getByText } = render(
    <SearchCard
      date={now}
      location={null}
      locationSearch={mockLocationSearch}
      setDate={mockSetDate}
      setLocation={mockSetLocation}
      setLocationQuery={mockSetLocationQuery}
      isSearching={false}
    />
  );
  const locationInput = getByLabelText(/location/i);
  userEvent.click(locationInput);
  userEvent.type(locationInput, 'San fr');
  const locationOption = getByText(/san francisco/i);
  userEvent.click(locationOption);

  wait(() => {
    expect(mockSetLocationQuery).toHaveBeenCalledTimes(6);
    expect(mockSetDate).toHaveBeenCalledTimes(0);
    expect(mockSetLocation).toHaveBeenCalledTimes(1);
    expect(mockSetLocation).toHaveBeenCalledWith({
      title: 'San Francisco',
      location_type: 'City',
      woeid: 2487956,
      latt_long: '37.777119, -122.41964'
    });
  });
});
