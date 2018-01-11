import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Homepage} from './Homepage';
import {Setup} from './Setup';
import * as api from '../api';
import * as NotificationSystem from 'react-notification-system';

declare global {
  interface Window {
    Notify: NotificationSystem.System;
  }
}

interface State {
  isSetup: boolean;
}

export class Main extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isSetup: false,
    };
  }

  async componentDidMount() {
    try {
      const isSetup = await api.request.isSetup();
      // using type guard to notify tsc that isSetup is actually a boolean even though isSetup() is typed to return "{value: boolean}".
      // there is a bug in the server package grpc-gateway that does not handle well-known types from protobuf/wrappers.proto properly
      if (typeof isSetup !== 'boolean') {
        api.handleError(
          new Error(
            'want "isSetup" to be typeof boolean, got typeof ' + typeof isSetup,
          ),
        );
        return;
      }
      this.setState({isSetup});
    } catch (e) {
      api.handleError(e);
    }
  }

  render() {
    return (
      <div>
        <NotificationSystem
          ref={(n: NotificationSystem.System) => (window.Notify = n)}
        />
        <h1>Demo Blog Platform</h1>
        {this.state.isSetup ? <Homepage /> : <Setup />}
      </div>
    );
  }
}
