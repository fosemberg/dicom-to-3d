export interface IParams<T = any> {
  params: T;
}

export interface IBody<T = any> {
  body: T;
}

export interface IData<T = any> {
  data: T;
}

export interface IWithUrl {
  url: string;
}

export type Agents = { [s: string]: boolean; };
