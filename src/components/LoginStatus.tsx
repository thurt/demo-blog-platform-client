import * as React from 'react';

export class LoginStatus extends React.Component<{}, {}> {
  static login(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
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
  static logout(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    window.app.pushState({authUser: undefined}, '/');
  }

  render() {
    return window.app.state.authUser === undefined ? (
      <div>
        <a
          href="/create-user"
          onClick={e => {
            e.preventDefault();
            window.app.pushState({}, '/create-user');
          }}>
          Create User
        </a>
        <span> | </span>
        <a href="/login" onClick={LoginStatus.login}>
          Login
        </a>
      </div>
    ) : (
      <div>
        <a
          style={{fontWeight: 'bold'}}
          href={`/users/${window.app.state.authUser.id}`}
          onClick={e => {
            e.preventDefault();
            window.app.pushState({}, `/users/${window.app.state.authUser.id}`);
          }}>
          {window.app.state.authUser.id}
        </a>
        <span> | </span>
        <a href="/" onClick={LoginStatus.logout}>
          Logout
        </a>
      </div>
    );
  }
}
