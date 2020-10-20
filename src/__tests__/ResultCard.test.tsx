import React from 'react';
import { render } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { wait } from '@testing-library/dom';
import ResultCard from '../components/ResultCard';
import { mockLocationDay } from '../utils/constants';

test('Result for day, and next days shows up', () => {
  const now = new Date();
  const { getByAltText } = render(
    <ResultCard
      location={{
        title: 'San Francisco',
        location_type: 'City',
        woeid: 2487956,
        latt_long: '37.777119, -122.41964'
      }}
      locationDay={mockLocationDay[0]}
      forecast={[]}
      date={now}
    />
  );
  wait(() => {
    getByAltText(/weather state/i);
    getByAltText(/weather state forecast/i);
    expect(getByAltText(/clear/i)).toBeInTheDocument();
  });
});
