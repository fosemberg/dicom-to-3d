export interface IParams<T = any> {
  params: T;
}

export interface IBody<T = any> {
  body: T;
}

export interface IData<T = any> {
  data: T;
}

export interface IWithRepositoryId {
  repositoryId: string;
}

export interface IWithUrl {
  url: string;
}