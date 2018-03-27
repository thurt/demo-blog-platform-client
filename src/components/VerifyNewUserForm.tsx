import * as React from 'react';
import * as form from '../form';

export type Props = {
  submit: (r: {token: string}) => Promise<boolean>;
};

export class VerifyNewUserForm extends React.Component<Props, {}> {
  constructor(p: Props) {
    super(p);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const f = event.currentTarget;

    // disable form inputs while submitting
    form.disableInputs(f);

    // get values of form
    const token = form.getInputByName(f, 'token').value;
    if (typeof token !== 'string') {
      throw new Error('want "token" typeof string, got ' + typeof token);
    }

    form.enableInputs(f);

    const success = await this.props.submit({token});
    if (!success) {
      form.enableInputs(f); // re-enable form inputs
    }
  }

  render() {
    return (
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
        onSubmit={this.handleSubmit}>
        <label>Verification Token: </label>
        <input name="token" type="text" required />

        <input className="btn btn-primary" type="submit" value="Verify" />
      </form>
    );
  }
}
