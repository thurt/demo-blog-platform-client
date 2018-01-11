import * as React from 'react';
import * as NotificationSystem from 'react-notification-system';
import * as api from '../api';
import * as cms from 'cms-client-api';

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
    const ins = Array.from(event.currentTarget.getElementsByTagName('input'));
    for (let i of ins) {
      i.setAttribute('disabled', 'true');
    }

    // get values of form
    const id = ins.find(i => i.name === 'id').value;
    const password = ins.find(i => i.name === 'password').value;
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
    try {
      const res = await api.request.setup({body: r});
      this.props.notifier.addNotification({
        title: 'Success!',
        message: 'Admin account created',
        level: 'success',
      });
    } catch (errRes) {
      if (errRes instanceof Error) {
        console.error(errRes);
        this.props.notifier.addNotification({
          title: 'Server Error',
          message:
            'Sorry, something went wrong when trying to communicate with the server. Please try again later.',
          level: 'error',
        });
      }
      if (errRes instanceof Response) {
        errRes
          .json()
          .then((e: api.apiError) =>
            this.props.notifier.addNotification({
              title: errRes.statusText,
              message: e.error,
              level: 'error',
            }),
          )
          .catch(e => {
            console.error(e);
            this.props.notifier.addNotification({
              title: 'Server Error',
              message:
                'Sorry, something went wrong when trying to communicate with the server. Please try again later.',
              level: 'error',
            });
          });
      }
      // enable the form again
      for (let i of ins) {
        i.removeAttribute('disabled');
      }
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
