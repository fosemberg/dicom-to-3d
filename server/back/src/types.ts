export interface IParams<T> {
  params: T;
}

export interface IBody<T> {
  body: T;
}

export interface IWithUrl {
  url: string;
}

export type Agents = { [s: string]: boolean; };
