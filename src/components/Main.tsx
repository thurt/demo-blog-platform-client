import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Homepage} from './Homepage';
import {Setup} from './Setup';
import {api} from '../api';
import * as cms from 'cms-client-api';
import * as NotificationSystem from 'react-notification-system';

interface State {
  isSetup: boolean;
}

interface CmsApiError {
  error: string;
  code: number;
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
    api
      .isSetup()
      .then(isSetup => {
        if (typeof isSetup !== 'boolean') {
          this.notifier.addNotification({
            title: 'Server Error',
            message: 'Sorry, the server returned an unexpected format.',
            level: 'error',
          });
          console.trace(
            new Error(
              'want "isSetup" to be typeof boolean, got typeof ' +
                typeof isSetup,
            ),
          );
          return;
        }
        this.setState({isSetup});
      })
      .catch((errResp: Response) => {
        errResp
          .json()
          .then((resp: CmsApiError) => {
            this.notifier.addNotification({
              title: errResp.statusText,
              message: resp.error,
              level: 'error',
            });
          })
          .catch(_ => {
            this.notifier.addNotification({
              title: 'Server Error',
              message:
                'Sorry, the server returned a format that could not be parsed.',
              level: 'error',
            });
          });
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
