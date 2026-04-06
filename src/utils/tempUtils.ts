function getTemperatureColor(temp: number | undefined, unit: 'C' | 'F' = 'C'): string {
  if (temp === undefined) return 'unknown';

  const tempC = unit === 'C' ? temp : (temp - 32) * 5 / 9;

  if (tempC <= 8) return 'coldest';
  if (tempC <= 15) return 'average';
  if (tempC <= 30) return 'warm';
  return 'hot';
}

export { getTemperatureColor };
