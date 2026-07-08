export function isPlaceholder(value: string | undefined) {
  if (!value) {
    return true;
  }

  return value.includes("PLACEHOLDER") || value.includes("example.com");
}

export function displayValue(
  value: string | undefined,
  fallback = "Будет добавлено",
) {
  return isPlaceholder(value) ? fallback : value;
}
