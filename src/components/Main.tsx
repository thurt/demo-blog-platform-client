import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Homepage} from './Homepage';
import {Setup} from './Setup';
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

const defaultState: State = {
  isSetup: undefined,
};

export class Main extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = defaultState;
  }

  componentDidMount() {
    window.addEventListener(
      'popstate',
      evt => {
        evt.stopImmediatePropagation();
        console.log('popstate:', evt.state);
        // evt.state could be null, which will not trigger a re-render in react
        evt.state === null
          ? this.setState(defaultState)
          : this.setState(evt.state);
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
    window.app.state === null
      ? this.setState(defaultState)
      : this.setState(window.app.state);
  }

  async componentDidUpdate() {
    if (this.state.isSetup === undefined) {
      try {
        const isSetup = await api.request.isSetup();
        // using type guard to notify tsc that isSetup is actually a boolean even though isSetup() is typed to return "{value: boolean}".
        // there is a bug in the server package grpc-gateway that does not handle well-known types from protobuf/wrappers.proto properly
        if (typeof isSetup !== 'boolean') {
          api.handleError(
            new Error(
              'want "isSetup" to be typeof boolean, got typeof ' +
                typeof isSetup,
            ),
          );
          return;
        }
        //this.setState({isSetup});
        isSetup
          ? window.app.pushState({isSetup}, '')
          : window.app.pushState({isSetup}, '/setup');
      } catch (e) {
        api.handleError(e);
      }
    }
  }

  render() {
    return (
      <div>
        <NotificationSystem
          ref={(n: NotificationSystem.System) => (window.Notify = n)}
        />
        <h1>Demo Blog Platform</h1>
        {this.state.isSetup === undefined ? (
          <em>Loading...</em>
        ) : this.state.isSetup ? (
          <Homepage />
        ) : (
          <Setup />
        )}
      </div>
    );
  }
}
