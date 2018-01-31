import * as React from 'react';

export class LoginStatus extends React.Component<{}, {}> {
  static login() {
    window.app.pushState({}, `/login?referrer=${window.location.pathname}`);
  }
  static logout() {
    window.app.pushState({authUser: undefined}, '/');
  }

  render() {
    return (
      <div>
        {window.app.state.authUser === undefined ? (
          <button onClick={LoginStatus.login}>Login</button>
        ) : (
          <div>
            {'Logged in as '}
            <a
              href={`/users/${window.app.state.authUser.id}`}
              onClick={e => {
                e.preventDefault();
                window.app.pushState(
                  {},
                  `/users/${window.app.state.authUser.id}`,
                );
              }}>
              {window.app.state.authUser.id}
            </a>
            <button onClick={LoginStatus.logout}>Logout</button>
          </div>
        )}
      </div>
    );
  }
}
