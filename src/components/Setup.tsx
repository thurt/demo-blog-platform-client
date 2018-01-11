import * as React from 'react';
import * as NotificationSystem from 'react-notification-system';

interface Props {
  notifier: NotificationSystem.System;
}

export class Setup extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const id = event.currentTarget.elements.namedItem('id');
    if (!(id instanceof HTMLInputElement)) {
      throw new Error(
        'want form element named "id" to be instanceof HTMLInputElement',
      );
    }
    const password = event.currentTarget.elements.namedItem('password');
    if (!(password instanceof HTMLInputElement)) {
      throw new Error(
        'want form element named "password" to be instanceof HTMLInputElement',
      );
    }
    alert('Your submission\n' + id.value + ':' + password.value);
    this.props.notifier.addNotification({
      title: 'Success!',
      message: 'Admin Account created',
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
          <label>
            Id: <input name="id" type="text" />
          </label>
          <label>
            Password: <input name="password" type="password" />
          </label>
          <input type="submit" value="Create Account" />
        </form>
      </div>
    );
  }
}
