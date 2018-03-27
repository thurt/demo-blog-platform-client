import * as React from 'react';
import {Page} from './Page';

export class NotFound extends React.Component<{}, {}> {
  render() {
    return (
      <Page title="Not Found">
        <p>
          {'The provided path "' +
            window.location.pathname +
            '" was not found!'}
        </p>
        <p>
          <b>
            Click{' '}
            <a
              href="/"
              onClick={e => {
                e.preventDefault();
                window.app.pushState({}, '/');
              }}>
              here
            </a>{' '}
            to go back home.
          </b>
        </p>
      </Page>
    );
  }
}
