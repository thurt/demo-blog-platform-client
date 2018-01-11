import * as React from 'react';
import * as NotificationSystem from 'react-notification-system';
import * as api from '../api';
import * as cms from 'cms-client-api';
import * as form from '../form';

interface Props {
  notifier: NotificationSystem.System;
}

export class Setup extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // disable form inputs while submitting
    form.disableInputs(event.currentTarget);

    // get values of form
    const id = form.getInputByName(event.currentTarget, 'id').value;
    const password = form.getInputByName(event.currentTarget, 'password').value;
    if (typeof id !== 'string') {
      throw new Error('want "id" typeof string, got ' + typeof id);
    }
    if (typeof password !== 'string') {
      throw new Error('want "password" typeof string, got ' + typeof password);
    }

    // create request obj from form values
    const r = {
      id,
      password,
    };

    // submit values
    const res = await api.request
      .setup({body: r})
      .catch(api.handleError)
      .then(_ => form.enableInputs(event.currentTarget)); // re-enable inputs after handling an error
    this.props.notifier.addNotification({
      title: 'Success!',
      message: 'Admin account created',
      level: 'success',
    });
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
          <label>Id: </label>
          <input name="id" type="text" />

          <label>Password: </label>
          <input name="password" type="password" />

          <input type="submit" value="Create Account" />
        </form>
      </div>
    );
  }
}
