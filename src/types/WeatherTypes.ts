export type Hour = {
  timeEpoch: number;
  time: string;
  tempC: number;
  tempF: number;
  isDay: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  }
  windMph: number;
  windKph: number;
  windDegree: number;
  windDir: string;
  pressureMb: number;
  pressureIn: number;
  precipMm: number;
  precipIn: number;
  snowCm: number;
  humidity: number;
  cloud: number;
  feelslikeC: number;
  feelslikeF: number;
  windchillC: number;
  windchillF: number;
  heatindexC: number;
  heatindexF: number;
  dewpointC: number;
  dewpointF: number;
  willItRain: number;
  chanceOfRain: number;
  willItSnow: number;
  chanceOfSnow: number;
  visKm: number;
  visMiles: number;
  gustMph: number;
  gustKph: number;
  uv: number;
}

export type Day = {
  maxtempC: number;
  maxtempF: number;
  mintempC: number;
  mintempF: number;
  avgtempC: number;
  avgtempF: number;
  maxwindMph: number;
  maxwindKph: number;
  totalprecipMm: number;
  totalprecipIn: number;
  totalsnowCm: number;
  avgvisKm: number;
  avgvisMiles: number;
  avghumidity: number;
  dailyWillItRain: number;
  dailyChanceOfRain: number;
  dailyWillItSnow: number;
  dailyChanceOfSnow: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  }
  uv: number;
}

export type ForecastDay = {
  astro: Record<string, unknown>
  date: string;
  dateEpoch: number;
  day: Day;
  hour: Hour[];
}

export type Current = {
  lastUpdatedEpoch: number;
  lastUpdated: string;
  tempC: number;
  tempF: number;
  isDay: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  }
  windMph: number;
  windKph: number;
  windDegree: number;
  windDir: string;
  pressureMb: number;
  pressureIn: number;
  precipMm: number;
  precipIn: number;
  humidity: number;
  cloud: number;
  feelslikeC: number;
  feelslikeF: number;
  windchillC: number;
  windchillF: number;
  heatindexC: number;
  heatindexF: number;
  dewpointC: number;
  dewpointF: number;
  visKm: number;
  visMiles: number;
  uv: number;
  gustMph: number;
  gustKph: number;
}

type Location = {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tzId: string;
  localtimeEpoch: number;
  localtime: string;
}

export type WeatherInformation = {
  forecast: {
    forecastday: ForecastDay[]
  }
  location: Location;
  current: Current;
}
