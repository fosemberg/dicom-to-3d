export interface IParam {
  name: string,
  value: string,
  measureUnit?: string,
  description?: string,
  groupId?: number[],
  relations?: string[],
}