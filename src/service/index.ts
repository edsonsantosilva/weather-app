const APIKEY: string = import.meta.env.VITE_API_KEY
const APIURL: string = import.meta.env.VITE_API_URL

const params = {
  key: APIKEY,
  q: '',
}

const generateUrl = (searchParam: string, type: string) => {
  params.q = searchParam
  const queryString = new URLSearchParams(params).toString()
  return `${APIURL}/${type}?${queryString}`
}

const fetchWeather = async (location: string) => {
  const WEATHER_NOW = 'forecast.json'
  const url = generateUrl(location, WEATHER_NOW)
  const response = await fetch(url)
  console.log('response', response)
  // TODO: implement global api error handler
  return response
}

export { fetchWeather }
