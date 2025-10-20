export function removeHash(value: string): string {
  return value.startsWith("#") ? value.slice(1) : value;
}
