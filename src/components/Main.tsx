import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Homepage} from './Homepage';
import {Setup} from './Setup';
import * as api from '../api';
import * as NotificationSystem from 'react-notification-system';

interface State {
  isSetup: boolean;
}

export class Main extends React.Component<{}, State> {
  notifier: NotificationSystem.System;

  constructor(props: {}) {
    super(props);
    this.state = {
      isSetup: false,
    };
    this.notifier = null;
  }

  componentDidMount() {
    api.request
      .isSetup()
      .then(isSetup => {
        if (typeof isSetup !== 'boolean') {
          this.notifier.addNotification({
            title: 'Server Error',
            message: 'Sorry, the server returned an unexpected format.',
            level: 'error',
          });
          console.error(
            new Error(
              'want "isSetup" to be typeof boolean, got typeof ' +
                typeof isSetup,
            ),
          );
          return;
        }
        this.setState({isSetup});
      })
      .catch(e => {
        api.handleError(e);
      });
  }

  render() {
    return (
      <div>
        <NotificationSystem
          ref={(n: NotificationSystem.System) => (this.notifier = n)}
        />
        <h1>Demo Blog Platform</h1>
        {this.state.isSetup ? <Homepage /> : <Setup notifier={this.notifier} />}
      </div>
    );
  }
}
