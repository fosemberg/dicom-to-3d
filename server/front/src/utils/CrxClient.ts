import {Observable, Subject, Subscriber} from "rxjs";
import {Message} from "./apiTypes";

import "rxjs/add/operator/timeout";
import {SERVER_WS_PORT} from "../config/env";

export class CrxClient {
  private host: string = `ws://localhost:${SERVER_WS_PORT}/`;
  private ws: WebSocket;
  public subject$: Observable<Message> = new Observable();
  public in$ = new Subject<Message>();
  public out$ = new Subject<Message>();

  public onReady = () => {};
  public isReady = false;

  public constructor() {
    this.ws = new WebSocket(this.host);
    (window as any).ws = this.ws;

    this.ws.onopen = () => {
      console.log('Соединение установлено.');
      this.subject$ = Observable.create(
        (observer: Subscriber<MessageEvent>) => {
          this.ws.onmessage = (messageEvent: MessageEvent) => {
            let outMessage = JSON.parse(messageEvent.data);
            observer.next(outMessage);
            this.in$.next(outMessage);
          };
          this.ws.onerror = observer.error;
          this.ws.onclose = observer.complete;
        }
      ).share();


      this.out$.subscribe(
        msg =>
          this.ws.send(msg.toString())
      );

      this.isReady = true;
      this.onReady();
    };

    this.ws.onclose = (event) => {
      this.wsCloseHandler(event);
    };

    this.ws.onerror = (error: any) => {
      alert("Ошибка " + error.message);
    };
  }

  private wsCloseHandler(event: CloseEvent) {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
    }
    console.log('Код: ' + event.code + ' причина: ' + event.reason);
  }
}

export const crxClient = new CrxClient();