import * as React from 'react';
import {posts} from '../api';
import * as error from '../error';
import {CmsPost} from 'cms-client-api';
import {Comments} from './Comments';
import {CreateComment} from './CreateComment';
import {Page} from './Page';

type State = {
  post: CmsPost;
  refreshComments: number;
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
    this.state = {post: undefined, refreshComments: 0};
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
      <Page>
        {p === undefined ? <em>Loading...</em> : null}
        {p ? (
          <div style={{width: '100%'}}>
            <h2 style={{wordBreak: 'break-word'}}>{p.title}</h2>
            <h4>
              {new Date(p.created).toDateString()}
              <br />
              {isGtDay(new Date(p.created), new Date(p.last_edited)) ? (
                <em style={{fontWeight: 'normal', fontSize: 'smaller'}}>
                  (edited: {new Date(p.last_edited).toDateString()})
                </em>
              ) : null}
            </h4>
            <div
              style={{wordBreak: 'break-word'}}
              dangerouslySetInnerHTML={{__html: p.content}}
            />
            <Comments id={p.id} _refresh={this.state.refreshComments} />
            <h4>Join the discussion</h4>
            {window.app.state.authUser && window.app.state.authUser.id ? (
              <CreateComment
                user_id={window.app.state.authUser.id}
                post_id={p.id}
                access_token={window.app.state.authUser.access_token}
                createdComment={() =>
                  this.setState({
                    refreshComments: this.state.refreshComments + 1,
                  })
                }
              />
            ) : (
              <p>
                <a
                  href={`/login?referrer=${window.location.pathname}`}
                  onClick={e => {
                    e.preventDefault();
                    window.app.pushState(
                      {},
                      `/login?referrer=${window.location.pathname}`,
                    );
                  }}>
                  Click here to login
                </a>
                <br />Or{' '}
                <a
                  href="/create-user"
                  onClick={e => {
                    e.preventDefault();
                    window.app.pushState({}, '/create-user');
                  }}>
                  create a user account
                </a>{' '}
                if you don&#39;t have one already.
              </p>
            )}
          </div>
        ) : null}
      </Page>
    );
  }
}
