import { ROUTE_CONSTANTS } from '@/app/providers/router/config/constants';

type Route = keyof typeof ROUTE_CONSTANTS;
type Path = (typeof ROUTE_CONSTANTS)[Route];

const routes = {
  [ROUTE_CONSTANTS.ROOT]: 'Главная',
  [ROUTE_CONSTANTS.SIGN_IN]: 'Авторизация',
  [ROUTE_CONSTANTS.USER]: 'Пользователь',
  [ROUTE_CONSTANTS.ADMIN]: 'Администратор',
  [ROUTE_CONSTANTS.CREATE_ATTRIBUTE]: 'Создание атрибута',
  [ROUTE_CONSTANTS.DOCUMENT_TYPES]: 'Типы документов',
} as const;

function getRussianRoute(path: Path): string | null {
  if (routes[path]) {
    return routes[path];
  }

  return null;
}

export { getRussianRoute };
