function getTemperatureColor(temp: number | undefined): string {
  if (temp === undefined) return 'unknown';
  if (temp <= 8) return 'coldest';
  if (temp <= 15) return 'average';
  if (temp <= 30) return 'warm';
  return 'hot';
}

export { getTemperatureColor };
