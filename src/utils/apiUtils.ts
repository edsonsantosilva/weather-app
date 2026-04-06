const countries: Record<string, string> = {
  Afghanistan: 'AF',
  Argentina: 'AR',
  Australia: 'AU',
  Austria: 'AT',
  Belgium: 'BE',
  Brazil: 'BR',
  Canada: 'CA',
  Chile: 'CL',
  China: 'CN',
  Colombia: 'CO',
  'Czech Republic': 'CZ',
  Denmark: 'DK',
  Egypt: 'EG',
  Finland: 'FI',
  France: 'FR',
  Germany: 'DE',
  Greece: 'GR',
  'Hong Kong': 'HK',
  Hungary: 'HU',
  India: 'IN',
  Indonesia: 'ID',
  Ireland: 'IE',
  Israel: 'IL',
  Italy: 'IT',
  Japan: 'JP',
  Kenya: 'KE',
  Malaysia: 'MY',
  Mexico: 'MX',
  Netherlands: 'NL',
  'New Zealand': 'NZ',
  Nigeria: 'NG',
  Norway: 'NO',
  Pakistan: 'PK',
  Peru: 'PE',
  Philippines: 'PH',
  Poland: 'PL',
  Portugal: 'PT',
  Romania: 'RO',
  Russia: 'RU',
  'Saudi Arabia': 'SA',
  Singapore: 'SG',
  'South Africa': 'ZA',
  'South Korea': 'KR',
  Spain: 'ES',
  Sweden: 'SE',
  Switzerland: 'CH',
  Thailand: 'TH',
  Turkey: 'TR',
  Ukraine: 'UA',
  'United Arab Emirates': 'AE',
  'United Kingdom': 'GB',
  UK: 'GB',
  'United States of America': 'US',
  USA: 'US',
  'United States': 'US',
  Vietnam: 'VN',
}

function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, char: string) => char.toUpperCase())
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function convertKeysToCamelCase<T>(value: unknown): T {
  if (Array.isArray(value)) {
    return value.map((item) => convertKeysToCamelCase(item)) as T
  }

  if (isRecord(value)) {
    const result: Record<string, unknown> = {}

    for (const key of Object.keys(value)) {
      const camelKey = toCamelCase(key)
      result[camelKey] = convertKeysToCamelCase(value[key])
    }

    return result as T
  }

  return value as T
}

function getCountryCode (name: string) : string | undefined {
  return countries[name] ?? undefined
}

export { convertKeysToCamelCase, getCountryCode }
