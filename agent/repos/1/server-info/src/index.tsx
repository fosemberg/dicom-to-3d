import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import getStore from "./store";

const renderAppWithStore = (store: any) => {
  ReactDOM.render(
    <Provider {...{store}}>
      <App/>
    </Provider>,
    document.getElementById('root') as HTMLElement
  );
  registerServiceWorker();
}

getStore()
  .then((store: any) => renderAppWithStore(store))

