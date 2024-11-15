export enum Status {
  UNSET = "unset",
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "succeess",
};

export interface Stateful {
  status: Status;
}
