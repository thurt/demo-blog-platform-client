import * as React from 'react';

export class LoginStatus extends React.Component<{}, {}> {
  static login() {
    let referrer: string;
    if (window.location.pathname === '/login') {
      // relay old referrer when clicking "Login" while already on the login page
      const params = new URLSearchParams(window.location.search);
      if (params.has('referrer')) {
        referrer = params.get('referrer');
      }
    } else {
      referrer = window.location.pathname;
    }
    window.app.pushState({}, `/login?referrer=${referrer}`);
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
