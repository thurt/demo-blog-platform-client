import * as React from 'react';
import {posts} from '../api';
import * as error from '../error';
import {CmsPost} from 'cms-client-api';
import {Comments} from './Comments';
import {CreateComment} from './CreateComment';

type State = {
  post: CmsPost;
};

function isGtDay(start: Date, end: Date): boolean {
  const day = 86400000; // 24hrs*60mins*60s*1000ms = x ms/day
  if (end.getTime() - start.getTime() > day) {
    return true;
  }
  return false;
}

export class Post extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {post: undefined};
  }

  async componentDidMount() {
    const path = window.location.pathname;
    const slug = path.replace(/\/posts\//, '');

    try {
      const post = await posts.getPostBySlug({slug});
      this.setState({post});
    } catch (e) {
      error.Handle(e);
    }
  }

  render() {
    const p = this.state.post;
    return (
      <div>
        {p === undefined ? <em>Loading...</em> : null}
        {p ? (
          <div>
            <h3>{p.title}</h3>
            <h4>
              {new Date(p.created).toDateString()}
              <br />
              {isGtDay(new Date(p.created), new Date(p.last_edited)) ? (
                <em style={{fontWeight: 'normal', fontSize: 'smaller'}}>
                  (edited: {new Date(p.last_edited).toDateString()})
                </em>
              ) : null}
            </h4>
            <div>{p.content}</div>
            <Comments id={p.id} />
            <h4>Join the discussion</h4>
            {window.app.state.authUser && window.app.state.authUser.id ? (
              <CreateComment
                user_id={window.app.state.authUser.id}
                post_id={p.id}
                access_token={window.app.state.authUser.access_token}
              />
            ) : (
              <p>
                Click here to <a href="/login">login</a>
                <br />Or <a href="/createAccount">create an account</a> if you
                don&#39;t have one already.
              </p>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}
