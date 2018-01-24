import * as React from 'react';

export class LoginStatus extends React.Component<{}, {}> {
  static login() {
    window.app.pushState({}, '/login');
  }
  static logout() {
    window.app.replaceState({authUser: undefined});
  }

  render() {
    return (
      <div>
        {window.app.state.authUser === undefined ? (
          <button onClick={LoginStatus.login}>Login</button>
        ) : (
          <div>
            <div>
              {'Logged in as '}
              <a href={`/users/${window.app.state.authUser.id}`}>
                {window.app.state.authUser.id}
              </a>
              <a href="/editor">Go to Post Editor</a>
            </div>
            <button onClick={LoginStatus.logout}>Logout</button>
          </div>
        )}
      </div>
    );
  }
}
