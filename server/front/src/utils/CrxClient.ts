import {IBarMessage, initBarMessage} from "./interfaces";
import {Observable, Subject, Subscriber, Subscription} from "rxjs";
import {Message} from "./Message";

import "rxjs/add/operator/timeout";

export const TYPE = {
  SUBSCRIBE: 'SUBSCRIBE',
  SUBSCRIPTION: 'SUBSCRIPTION',
  UNSUBSCRIPTION: 'UNSUBSCRIPTION',
  REQUEST: 'REQUEST',
  RESPONSE: 'RESPONSE',
  EVENT: 'EVENT'
};

export enum ACTION {
  BAR = 'bar',
  BAR_HISTORY = 'bar-history',
  DICTIONARY = 'dictionary',
  AUTH = 'auth',
  START_BUILD = 'START_BUILD',
  BUILD_RESULT = 'BUILD_RESULT',
  BUILD_RESULTS = 'BUILD_RESULTS',
}

const WS_PORT = 8022;

export class CrxClient {
  private host: string = `ws://localhost:${WS_PORT}/`;
  private ws: WebSocket;
  private ridInc: number = 1;
  private isBarView1Subscribe: boolean = false;
  private isBarSubscribeLast: boolean = false;
  private barSid: number = 1;
  public subject$: Observable<Object> = new Observable();
  public in$ = new Subject<Message>();
  public out$ = new Subject<Message>();

  private barMessage: IBarMessage = initBarMessage;
  private subscriptionIn$: Subscription = new Subscription();


  public constructor() {
    this.ws = new WebSocket(this.host);

    this.ws.onopen = () => {
      console.log('Соединение установлено.');
      // авторизация
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

      this.subscriptionIn$ = this.in$
        .subscribe(
          (message: any) => {
            if (message.type === TYPE.RESPONSE) {
              if (message.action === ACTION.AUTH) {
                // {"type":"RESPONSE","action":"auth","body":{"account_id":1},"rid":1}
                // this.subscribeAll();
              } else if (message.action === ACTION.BAR) {
                // {"type":"RESPONSE","action":"bar","body":{"ts":1534428370,"bar":{"h":1.1405,"l":1.14048,"o":1.14049,"c":1.1405,"v":6}},"rid":2,"sid":1}
                let sid = message.sid;
                if (sid) {
                  this.barSid = message.sid;
                  console.log(`SID now: ${this.barSid}`)
                }
              }
            } else {
              console.log('from Subscribe: ', message)
            }
          }
        );

      this.out$.subscribe(
        msg =>
          this.ws.send(msg.toString())
      );

      this.auth();
    };

    this.ws.onclose = (event) => {
      this.wsCloseHandler(event);
    };

    this.ws.onerror = (error: any) => {
      alert("Ошибка " + error.message);
    };
  }

  auth() {
    // авторизация remote
    this.ws.send(JSON.stringify({
      type: TYPE.REQUEST,
      v: 2,
      rid: this.ridInc++,
      action: ACTION.AUTH,
      body: {
        // TODO: remove hardcode
        token: "p24d545382bf132265c7bcb71acddbae0",
        client: {
          // TODO: do version generator with webpack
          version: "app_version",
          // TODO: remove hardcode
          timezone_offset: 10800,
          instance_id: ""
        }
      }
    }));
  }

  subscribeBar() {
    this.subscribe({
      action: ACTION.BAR,
      body: {
        asset_id: 1,
        bar_size: 5
      }
    });
  }

  subscribe(json: Object) {
    let jsonOut = {
      ...json,
      type: TYPE.SUBSCRIPTION,
      rid: this.ridInc++
    };
    this.ws.send(JSON.stringify(jsonOut));
  }

  unsubscribe(json: Object) {
    let jsonOut = {
      ...json,
      type: TYPE.UNSUBSCRIPTION,
      rid: this.ridInc++
    };
    this.ws.send(JSON.stringify(jsonOut));
  }

  unsubscribeBar() {
    this.unsubscribe({
      action: ACTION.BAR,
      body: {
        sid: this.barSid
      }
    });
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

export const crxClient: CrxClient = new CrxClient();