import * as React from 'react';
import {comments} from '../api';
import * as error from '../error';
import * as form from '../form';
import {CmsCreateCommentRequest, CmsAccessToken} from 'cms-client-api';

type Props = {
  user_id: CmsCreateCommentRequest['user_id'];
  post_id: CmsCreateCommentRequest['post_id'];
  access_token: CmsAccessToken['access_token'];
};

export class CreateComment extends React.Component<Props, {}> {
  constructor(p: Props) {
    super(p);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const f = event.currentTarget;

    // disable form inputs while submitting
    form.disableInputs(event.currentTarget);

    // get values of form
    const cTextarea = form.getTextAreaByName(f, 'comments');
    const c = cTextarea.value;
    if (typeof c !== 'string') {
      throw new Error('want "comments" typeof string, got ' + typeof c);
    }

    const r: CmsCreateCommentRequest = {
      content: c,
      user_id: this.props.user_id,
      post_id: this.props.post_id,
    };

    try {
      // submit values
      await comments.createComment(
        {body: r},
        {headers: {Authorization: `Bearer ${this.props.access_token}`}},
      );
      window.Notify.addNotification({
        title: 'Success!',
        message: 'Your comment has been submitted',
        level: 'success',
      });
      cTextarea.value = ''; // clear textarea after handling -- this allows user to enter another comment
    } catch (e) {
      error.Handle(e);
    }
    form.enableInputs(f); // re-enable inputs after handling
  }

  render() {
    return (
      <form
        style={{display: 'flex', flexDirection: 'column', width: '500px'}}
        onSubmit={this.handleSubmit}>
        <textarea
          style={{height: '100px', resize: 'vertical'}}
          name="comments"
          placeholder="Enter your comments here..."
          required
        />
        <input type="submit" value="Add Comments" />
      </form>
    );
  }
}
