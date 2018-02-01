import * as React from 'react';
import {Page} from './Page';

export class NotFound extends React.Component<{}, {}> {
  render() {
    return (
      <Page>
        <h2>404: Not Found</h2>
        <p>
          {'The provided path "' +
            window.location.pathname +
            '" was not found!'}
        </p>
        <p>
          <b>
            Click{' '}
            <a
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
