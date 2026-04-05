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

export { convertKeysToCamelCase }
