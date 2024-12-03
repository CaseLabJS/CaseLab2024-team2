export const ROUTE_CONSTANTS = {
  ROOT: { path: '/', ruTitle: 'Главная' },
  SIGN_IN: { path: '/signin', ruTitle: 'Авторизация' },
  ADMIN: { path: '/admin', ruTitle: 'Администратор' },
  DOCUMENTS: { path: '/documents', ruTitle: 'Документы' },
  ATTRIBUTES: { path: '/attributes', ruTitle: 'Атрибуты' },
  USERS: { path: '/users', ruTitle: 'Пользователи' },
  USER_PROFILE: { path: '/profile', ruTitle: 'Профиль пользователя' },
  DOCUMENT_TYPES: { path: '/document-types', ruTitle: 'Типы документов' },
  CREATE_VOTING: { path: '/create-voting', ruTitle: 'Создание голосования' },
  USER_DOCUMENTS: { path: '/documents', ruTitle: 'Документы пользователя' },
  DOCUMENT_CARD: { path: '/:documentId', ruTitle: 'Документ' },
} as const;
