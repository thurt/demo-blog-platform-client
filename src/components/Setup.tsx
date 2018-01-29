import * as React from 'react';
import {setup} from '../api';
import * as error from '../error';
import * as form from '../form';

export class Setup extends React.Component<{}, {}> {
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
    const r = {
      email,
      id,
      password,
    };

    try {
      // submit values
      await setup.setup({body: r});
      window.Notify.addNotification({
        title: 'Success!',
        message: 'Admin account created',
        level: 'success',
      });
      window.app.pushState({isSetup: true}, '/');
    } catch (e) {
      error.Handle(e);
      form.enableInputs(f); // re-enable inputs after handling an error
    }
  }

  render() {
    return (
      <div>
        <h2>Setup Admin account</h2>
        <p>
          {
            'Since this is your first time accessing your blog, you will first need to create an admin account. Please choose your id and password.'
          }
        </p>
        <form onSubmit={this.handleSubmit}>
          <label>Email: </label>
          <input name="email" type="email" />

          <label>Id: </label>
          <input name="id" type="text" />

          <label>Password: </label>
          <input name="password" type="password" />
          <label>Repeat Password: </label>
          <input name="repeat_password" type="password" />

          <input type="submit" value="Create Account" />
        </form>
      </div>
    );
  }
}
