import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Homepage} from './Homepage';
import {Setup} from './Setup';
import {api} from '../api';
import * as NotificationSystem from 'react-notification-system';

interface State {
  isSetup: boolean;
}

export interface MainContext {
  aprop: string;
}

export class Main extends React.Component<{}, State> {
  _notificationSystem: NotificationSystem.System;

  constructor(props: {}) {
    super(props);
    this.state = {
      isSetup: false,
    };
    this._notificationSystem = null;
  }

  componentDidMount() {
    if (this._notificationSystem != null) {
      this._notificationSystem.addNotification({
        title: 'Success!',
        message: 'notification message',
        level: 'success',
      });
    }
    api
      .isSetup()
      .then(isSetup => {
        this.setState({isSetup: Boolean(isSetup)});
        return isSetup;
      })
      .catch(err => console.error('encountered error:', err));
  }

  render() {
    return (
      <div>
        <NotificationSystem
          ref={(n: NotificationSystem.System) => (this._notificationSystem = n)}
        />
        <h1>Demo Blog Platform</h1>
        {this.state.isSetup ? (
          <Homepage />
        ) : (
          <Setup toast={this._notificationSystem} />
        )}
      </div>
    );
  }
}
