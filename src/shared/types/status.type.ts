export enum Status {
  UNSET = 'unset',
  LOADING = 'loading',
  ERROR = 'error',
  SUCCESS = 'success',
}

export type Stateful<T> = T & {
  status: Status;
  getOriginal(): T;
};
