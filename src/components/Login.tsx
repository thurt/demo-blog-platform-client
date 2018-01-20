import * as React from 'react';
import * as form from '../form';
import * as api from '../api';

export class Login extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const f = event.currentTarget;

    // disable form inputs while submitting
    form.disableInputs(event.currentTarget);

    // get values of form
    const id = form.getInputByName(f, 'id').value;
    const password = form.getInputByName(f, 'password').value;
    if (typeof id !== 'string') {
      throw new Error('want "id" typeof string, got ' + typeof id);
    }
    if (typeof password !== 'string') {
      throw new Error('want "password" typeof string, got ' + typeof password);
    }

    try {
      // submit values
      const authUser = await api.request.authUser({body: {id, password}});
      const user = await api.request.getUser({id});
      // combine authUser and user keys into app.state.authUser
      window.app.pushState({authUser: {...authUser, ...user}}, '/');
      window.Notify.addNotification({
        title: 'Success!',
        message: 'You are now logged in as ' + window.app.state.authUser.id,
        level: 'success',
      });
    } catch (e) {
      api.handleError(e);
      form.enableInputs(f);
    }
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Id: </label>
          <input name="id" type="text" />

          <label>Password: </label>
          <input name="password" type="password" />

          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}
