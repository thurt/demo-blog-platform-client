import * as React from 'react';

export class NotFound extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <h2>404: Not Found</h2>
        <p>
          {'The provided path "' +
            window.location.pathname +
            '" was not found!'}
        </p>
        <p>
          <b>
            Click <a onClick={() => window.app.pushState({}, '/')}>here</a> to
            go back home.
          </b>
        </p>
      </div>
    );
  }
}
