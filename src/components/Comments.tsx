import * as React from 'react';
import {comments, streamRequest, basePath, Chunk} from '../api';
import * as error from '../error';
import {CmsComment} from 'cms-client-api';
import * as date from '../date';

type State = {
  cs: Array<CmsComment>;
};

type Props = {
  id: number;
  _refresh: number;
};

export class Comments extends React.Component<Props, State> {
  constructor(p: Props) {
    super(p);
    this.state = {cs: undefined};
    this.deleteComment = this.deleteComment.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props._refresh !== nextProps._refresh) {
      this.componentDidMount();
    }
  }

  async componentDidMount() {
    const cs: State['cs'] = [];
    try {
      await streamRequest(
        basePath + '/posts/' + this.props.id + '/comments',
        (cc: Chunk<{result: CmsComment}>) => {
          cs.push(cc.value.result);
          this.setState({cs});
        },
      );

      // will be true when have finished fetching posts and there were no posts
      if (cs.length === 0) this.setState({cs: []});
    } catch (e) {
      error.Handle(e);
    }
  }

  deleteComment(id: CmsComment['id']) {
    return async (e: React.SyntheticEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (window.confirm('Are you sure you want to delete this comment?')) {
        try {
          await comments.deleteComment(
            {id},
            {
              headers: {
                Authorization: `Bearer ${
                  window.app.state.authUser.access_token
                }`,
              },
            },
          );
          window.Notify.addNotification({
            title: 'Success!',
            message: 'Your comment was deleted',
            level: 'success',
          });
          this.componentDidMount(); // update comments list
        } catch (e) {
          error.Handle(e);
        }
      }
    };
  }

  render() {
    const cs = this.state.cs;
    return (
      <div style={{marginTop: '2vw', display: 'flex', flexDirection: 'column'}}>
        <h3>Comments</h3>
        {cs && cs.length === 0 ? (
          <em style={{marginLeft: '1vw'}}>This post has no comments yet!</em>
        ) : null}
        {cs &&
          cs.map((c, i) => {
            return (
              <div key={c.id} style={{marginLeft: '1vw'}}>
                <h4>
                  <em style={{fontWeight: 'normal', fontSize: 'smaller'}}>
                    {date.GMT(c.created).toLocaleString()}
                  </em>
                  <br />
                  <a
                    href={`/users/${c.user_id}`}
                    onClick={e => {
                      e.preventDefault();
                      window.app.pushState({}, `/users/${c.user_id}`);
                    }}>
                    {c.user_id}
                  </a>{' '}
                  wrote...
                </h4>
                <p>{c.content}</p>
                {window.app.state.authUser &&
                (window.app.state.authUser.id === c.user_id ||
                  window.app.state.authUser.role === 'ADMIN') ? (
                  <p style={{fontSize: 'smaller'}}>
                    <button onClick={this.deleteComment(c.id)}>
                      Delete Comment
                    </button>
                  </p>
                ) : null}
              </div>
            );
          })}
      </div>
    );
  }
}
