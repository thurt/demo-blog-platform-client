import * as React from 'react';
import {users, register} from '../api';
import * as error from '../error';
import * as form from '../form';
import {CmsCreateUserRequest} from 'cms-client-api';
import {RegisterNewUserForm} from './RegisterNewUserForm';
import {VerifyNewUserForm} from './VerifyNewUserForm';
import {Page} from './Page';

type Step = {
  title: string;
  instructions: string;
  Form: JSX.Element;
};

type State = {
  steps: Array<Step>;
  step: number;
};

export class CreateUser extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.state = {
      step: 0,
      steps: [
        {
          title: 'Register for User Account',
          instructions:
            'Enter your desired username and password. Note that a valid email address is required to complete registration. Please feel free to use a temporary email address from mailinator.com for this demo.',
          Form: <RegisterNewUserForm submit={this.handleSubmit} />,
        },
        {
          title: 'Verify your Email Address',
          instructions:
            'We have sent you an email containing a verification token. Please paste the verification token in the prompt below.',
          Form: <VerifyNewUserForm submit={this.handleSubmit1} />,
        },
      ],
    };
  }

  async handleSubmit(r: {id: string; password: string; email: string}) {
    try {
      // submit values
      await register.registerNewUser({body: r});
      this.setState({step: this.state.step + 1});
      return true;
    } catch (e) {
      error.Handle(e);
      return false;
    }
  }

  async handleSubmit1(r: {token: string}) {
    try {
      // submit values
      await register.verifyNewUser(
        {body: {}},
        {headers: {Authorization: `Bearer ${r.token}`}},
      );
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

  render() {
    const step = this.state.steps[this.state.step];
    return (
      <Page>
        <h2>Create User</h2>
        <hr />
        <h3>{`Step ${this.state.step + 1} of ${this.state.steps.length} - ${
          step.title
        }`}</h3>
        <p>{step.instructions}</p>
        {step.Form}
      </Page>
    );
  }
}
