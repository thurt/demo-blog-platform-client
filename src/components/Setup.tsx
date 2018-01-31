import * as React from 'react';
import {auth, setup} from '../api';
import * as error from '../error';
import * as form from '../form';
import {CreateUserForm} from './CreateUserForm';

export class Setup extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(r: {id: string; password: string; email: string}) {
    try {
      // submit values
      await setup.setup({body: r});
      window.Notify.addNotification({
        title: 'Success!',
        message: 'New admin created',
        level: 'success',
      });
      window.app.pushState({isSetup: true}, '/login');
      window.Notify.addNotification({
        title: 'Redirected to login screen',
        message:
          'Enter your username/password to access your newly created account',
        level: 'info',
      });
      return true;
    } catch (e) {
      error.Handle(e);
      return false;
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
        <CreateUserForm submit={this.handleSubmit} />
      </div>
    );
  }
}
