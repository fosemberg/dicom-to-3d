export const initBarMessage: IBarMessage = {
  sid: 0,
  aid: 0,
  body: {
    ts: 0,
    bar: {
      r: 0,
      g: 0,
      b: 0,
    }
  }
};

interface Event {
  sid: number;
  aid: number;
}

export interface IBarMessage extends Event {
  body: IBodyBar;
}

export interface IBodyBar {
  ts: number;
  bar: IBar;
}

export interface LineChartPoint {
  date: number;
  value: number;
}

export type Color = 'r' | 'g' | 'b'

type IBar = { [index in Color] : number }