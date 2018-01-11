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
    const isSetup = await api.request.isSetup().catch(api.handleError);
    // using type guard to notify tsc that isSetup is actually a boolean even though isSetup() is typed to return "{value: boolean}".
    // there is a bug in the server package grpc-gateway that does not handle well-known types from protobuf/wrappers.proto properly
    if (typeof isSetup !== 'boolean') {
      window.Notify.addNotification({
        title: 'Server Error',
        message: 'Sorry, the server returned an unexpected format.',
        level: 'error',
      });
      console.error(
        new Error(
          'want "isSetup" to be typeof boolean, got typeof ' + typeof isSetup,
        ),
      );
      return;
    }
    this.setState({isSetup});
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
