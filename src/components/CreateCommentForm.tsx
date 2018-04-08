import * as React from 'react';
import {comments} from '../api';
import * as error from '../error';
import * as form from '../form';
import {CmsCreateCommentRequest, CmsAccessToken} from 'cms-client-api';

type Props = {
  userId: CmsCreateCommentRequest['userId'];
  postId: CmsCreateCommentRequest['postId'];
  accessToken: CmsAccessToken['accessToken'];
  createdComment: () => void;
};

export class CreateCommentForm extends React.Component<Props, {}> {
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
      userId: this.props.userId,
      postId: this.props.postId,
    };

    try {
      // submit values
      await comments.createComment(
        {body: r},
        {headers: {Authorization: `Bearer ${this.props.accessToken}`}},
      );
      window.Notify.addNotification({
        title: 'Success!',
        message: 'Your comment has been added',
        level: 'success',
      });
      this.props.createdComment();
      cTextarea.value = ''; // clear textarea after handling -- this allows user to enter another comment
    } catch (e) {
      error.Handle(e);
    }
    form.enableInputs(f); // re-enable inputs after handling
  }

  render() {
    return (
      <form
        style={{display: 'flex', flexDirection: 'column', maxWidth: '500px'}}
        onSubmit={this.handleSubmit}>
        <textarea
          style={{height: '100px', resize: 'vertical'}}
          name="comments"
          placeholder="Enter your comments here..."
          required
        />
        <input className="btn btn-primary" type="submit" value="Add Comments" />
      </form>
    );
  }
}
