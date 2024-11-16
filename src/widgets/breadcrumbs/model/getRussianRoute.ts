import { ROUTE_CONSTANTS } from '@/app/providers/router/config/constants';

type Route = keyof typeof ROUTE_CONSTANTS;
type Title = (typeof ROUTE_CONSTANTS)[Route]['ruTitle'];
type Path = (typeof ROUTE_CONSTANTS)[Route]['path'];
type TitleAndPath = { ruTitle: Title; path: Path };

function getRussianRouteAndPath(path: string): TitleAndPath | null {
  const result = Object.entries(ROUTE_CONSTANTS).find(([key, value]) => {
    if (value.path === `/${path}`) {
      return key;
    }
  });

  return result ? result[1] : null;
}

export { getRussianRouteAndPath };
