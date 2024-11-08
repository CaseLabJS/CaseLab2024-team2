import { ROUTE_CONSTANTS } from '@/app/providers/router/config/constants';

type Route = keyof typeof ROUTE_CONSTANTS;
type Path = (typeof ROUTE_CONSTANTS)[Route]['path'];
type Title = (typeof ROUTE_CONSTANTS)[Route]['ruTitle'];

function getRussianRoute(path: Path): Title | null {
  Object.entries(ROUTE_CONSTANTS).find(([_key, value]) => {
    if (value.path === path) {
      return value.ruTitle;
    }
  });

  return null;
}

export { getRussianRoute };
