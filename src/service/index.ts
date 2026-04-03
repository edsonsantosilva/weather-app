const APIKEY: string = import.meta.env.VITE_API_KEY
const APIURL: string = import.meta.env.VITE_API_URL

const baseUrl = APIURL
const params = {
  key: APIKEY,
  q: ''
}

const generateUrl = (searchParam: string) => {
  params.q = searchParam;
  const queryString = new URLSearchParams(params).toString()
  return `${baseUrl}?${queryString}`
}
