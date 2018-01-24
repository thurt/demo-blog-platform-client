import * as React from 'react';
import {Home} from './Home';
import {Setup} from './Setup';
import {Router} from './Router';
import {LoginStatus} from './LoginStatus';
import Store from '../store';

import * as api from '../api';
import * as NotificationSystem from 'react-notification-system';
import {CmsAccessToken, CmsUser, CmsPost, CmsUserRole} from 'cms-client-api';

declare global {
  interface Window {
    Notify: NotificationSystem.System;
    app: App;
  }
}

interface App {
  readonly state: State;
  pushState(data: Partial<State>, url: string): void;
  replaceState(data: Partial<State>): void;
}

window.app = {
  get state() {
    if (window.history.state === null) {
      return initialState;
    }
    return window.history.state;
  },
  pushState(data, url) {
    console.log('call to pushState', data, url);
    const newState = {...window.app.state, ...data};
    window.history.pushState(newState, '', url);
    Store.set('state', JSON.stringify(newState));
    window.dispatchEvent(new CustomEvent('stateChange', {detail: newState}));
  },
  replaceState(data) {
    console.log('call to replaceState', data);
    const newState = {...window.app.state, ...data};
    window.history.replaceState(newState, '');
    Store.set('state', JSON.stringify(newState));
    window.dispatchEvent(new CustomEvent('stateChange', {detail: newState}));
  },
};

interface State {
  isSetup: boolean;
  authUser: CmsAccessToken & CmsUser;
}

const initialState: State = {
  isSetup: undefined,
  authUser: undefined,
};

export class Main extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    window.addEventListener(
      'popstate',
      evt => {
        evt.stopImmediatePropagation();
        console.log('popstate:', evt.state);
        this.setState(window.app.state);
      },
      true,
    );
    window.addEventListener(
      'stateChange',
      (evt: CustomEvent) => {
        evt.stopImmediatePropagation();
        console.log('stateChange:', evt.detail);
        this.setState(evt.detail);
      },
      true,
    );
    this.setState(window.app.state);
  }

  render() {
    return (
      <div id="main">
        <NotificationSystem
          ref={(n: NotificationSystem.System) => (window.Notify = n)}
        />
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <h1>
            <a href="/">Demo Blog Platform</a>
          </h1>
          {window.app.state.authUser.role === 'ADMIN' &&
          !window.location.pathname.includes('/editor') ? (
            <div>
              <a href="/editor">Go To Editor</a>
            </div>
          ) : null}
          <LoginStatus />
        </header>
        <Router route={window.location.pathname} />
      </div>
    );
  }
}
