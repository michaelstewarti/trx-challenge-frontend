export interface LocationSearch {
  /** The text inside the button */
  title: string;
  location_type: string;
  latt_long: string;
  woeid: number;
  distance?: number;
}

export interface ConsolidatedWeather {
  id: any;
  weather_state_name: string;
  weather_state_abbr: string;
  wind_direction_compass?: string;
  created: string;
  applicable_date: string;
  min_temp?: number | null;
  max_temp?: number | null;
  the_temp?: number | null;
  wind_speed?: number | null;
  wind_direction?: number | null;
  air_pressure?: number | null;
  humidity?: number | null;
  visibility?: number | null;
  predictability?: number;
}

export interface Parent {
  title: string;
  location_type: string;
  woeid: number;
  latt_long: string;
}

export interface Source {
  title: string;
  slug: string;
  url: string;
  crawl_rate: number;
}

export interface Location {
  consolidated_weather: ConsolidatedWeather[];
  time: string;
  sun_rise: string;
  sun_set: string;
  timezone_name: string;
  parent: Parent;
  sources: Source[];
  title: string;
  location_type: string;
  woeid: number;
  latt_long: string;
  timezone: string;
}



