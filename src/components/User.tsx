import * as React from 'react';
import * as api from '../api';
import {CmsUser} from 'cms-client-api';

type State = {
  user: CmsUser;
};

export class User extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {user: undefined};
  }

  async componentDidMount() {
    const id = window.location.pathname.replace(/\/users\//, '');
    try {
      const user = await api.request.getUser({id});
      this.setState({user});
    } catch (e) {
      api.handleError(e);
    }
  }

  render() {
    const u = this.state.user;
    return (
      <div>
        {u === undefined ? <em>Loading...</em> : null}
        {u ? (
          <div>
            <h2>User Profile: {u.id}</h2>
            <h3>
              <a href={`mailto:${u.email}`}>{u.email}</a>
            </h3>
            <ul>
              <li>Role: {u.role}</li>
              <li>Member Since: {u.created}</li>
              <li>Last Active: {u.last_active}</li>
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}
