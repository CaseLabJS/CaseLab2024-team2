export const ROUTE_CONSTANTS = {
  ROOT: { path: '/', ruTitle: 'Главная' },
  SIGN_IN: { path: '/signin', ruTitle: 'Авторизация' },
  USER: { path: '/user', ruTitle: 'Пользователь' },
  ADMIN: { path: '/admin', ruTitle: 'Администратор' },
  CREATE_ATTRIBUTE: { path: '/create-attribute', ruTitle: 'Создать аттрибут' },
  DOCUMENT_TYPES: { path: '/document-types', ruTitle: 'Типы документов' },
} as const;
