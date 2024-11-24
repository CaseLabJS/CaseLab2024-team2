export const ROUTE_CONSTANTS = {
  ROOT: { path: '/', ruTitle: 'Главная' },
  SIGN_IN: { path: '/signin', ruTitle: 'Авторизация' },
  USER: { path: '/user', ruTitle: 'Пользователь' },
  ADMIN: { path: '/admin', ruTitle: 'Администратор' },
  DOCUMENTS: { path: '/documents', ruTitle: 'Документы' },
  ATTRIBUTES: { path: '/attributes', ruTitle: 'Аттрибуты' },
  DOCUMENT_TYPES: { path: '/document-types', ruTitle: 'Типы документов' },
} as const;
