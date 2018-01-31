import * as React from 'react';
import {users} from '../api';
import * as error from '../error';
import * as form from '../form';
import {CmsCreateUserRequest} from 'cms-client-api';
import {CreateUserForm} from './CreateUserForm';

async function handleSubmit(r: {id: string; password: string; email: string}) {
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
    return true;
  } catch (e) {
    error.Handle(e);
    return false;
  }
}

export class CreateUser extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Create User</h2>
        <CreateUserForm submit={handleSubmit} />
      </div>
    );
  }
}
