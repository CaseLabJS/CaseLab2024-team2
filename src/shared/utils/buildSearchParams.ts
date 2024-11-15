export function buildSearchParams(object: object): URLSearchParams {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(object)) searchParams.set(key, '' + value);

  return searchParams;
}
