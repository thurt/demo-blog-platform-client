import * as React from 'react';
import {users} from '../api';
import * as error from '../error';
import * as form from '../form';
import {CmsCreateUserRequest} from 'cms-client-api';

export class CreateUser extends React.Component<{}, {}> {
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
    const email = form.getInputByName(f, 'email').value;
    const id = form.getInputByName(f, 'id').value;
    const password = form.getInputByName(f, 'password').value;
    const repeat_password = form.getInputByName(f, 'repeat_password').value;
    if (typeof email !== 'string') {
      throw new Error('want "email" typeof string, got ' + typeof email);
    }
    if (typeof id !== 'string') {
      throw new Error('want "id" typeof string, got ' + typeof id);
    }
    if (typeof password !== 'string') {
      throw new Error('want "password" typeof string, got ' + typeof password);
    }
    if (typeof repeat_password !== 'string') {
      throw new Error(
        'want "repeat_password" typeof string, got ' + typeof repeat_password,
      );
    }

    // confirm passwords match
    if (password !== repeat_password) {
      window.Notify.addNotification({
        title: 'Validation Error',
        message:
          'Passwords must match. Please retry entering your password twice.',
        level: 'error',
      });
      form.enableInputs(f);
      return;
    }

    // create request obj from form values
    const r: CmsCreateUserRequest = {
      email,
      id,
      password,
    };

    try {
      // submit values
      await users.createUser({body: r});
      window.Notify.addNotification({
        title: 'Success!',
        message: 'New user created',
        level: 'success',
      });
      window.app.pushState({}, '/login');
      window.Notify.addNotification({
        title: 'Redirected to login screen',
        message:
          'Enter your username and password to access your newly created account',
        level: 'info',
      });
    } catch (e) {
      error.Handle(e);
      form.enableInputs(f); // re-enable inputs after handling an error
    }
  }

  render() {
    return (
      <div>
        <h2>Create User</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Email: </label>
          <input name="email" type="email" required />

          <label>Id: </label>
          <input name="id" type="text" required />

          <label>Password: </label>
          <input name="password" type="password" required />
          <label>Repeat Password: </label>
          <input name="repeat_password" type="password" required />

          <input type="submit" value="Create Account" />
        </form>
      </div>
    );
  }
}
