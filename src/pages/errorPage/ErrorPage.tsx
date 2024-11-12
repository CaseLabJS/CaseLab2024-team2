import type { ReactElement } from 'react';

import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const ErrorRoute = (): ReactElement => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.data}</i>
        </p>
      </div>
    );
  }
  console.error(error);
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error instanceof Error ? error.message : 'Неизвестная ошибка'}</i>
      </p>
    </div>
  );
};

export default ErrorRoute;
