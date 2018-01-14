import * as React from 'react';
import {Home} from './Home';
import {Setup} from './Setup';
import {Router} from './Router';
import * as api from '../api';
import * as NotificationSystem from 'react-notification-system';

declare global {
  interface Window {
    Notify: NotificationSystem.System;
    app: App;
  }
}

interface App {
  readonly state: State;
  pushState(data: Partial<State>, url?: string | null): void;
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
    const newState = {...window.app.state, ...data};
    window.history.pushState(newState, '', url);
    window.dispatchEvent(new CustomEvent('stateChange', {detail: newState}));
  },
  replaceState(data) {
    const newState = {...window.app.state, ...data};
    window.history.replaceState(newState, '');
    window.dispatchEvent(new CustomEvent('stateChange', {detail: newState}));
  },
};

interface State {
  isSetup: boolean;
}

const initialState: State = {
  isSetup: undefined,
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
      <div>
        <NotificationSystem
          ref={(n: NotificationSystem.System) => (window.Notify = n)}
        />
        <h1>Demo Blog Platform</h1>
        <Router route={window.location.pathname} />
      </div>
    );
  }
}
