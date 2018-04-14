import * as React from 'react';
import {posts} from '../api';
import * as error from '../error';
import {CmsPost} from 'cms-client-api';
import {Comments} from './Comments';
import {CreateCommentForm} from './CreateCommentForm';
import {Page} from './Page';
import * as date from '../date';
import * as showdown from 'showdown';

type State = {
  post: CmsPost;
  refreshComments: number;
  pid: CmsPost['id'];
};

const converter = new showdown.Converter();

export class Post extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      post: undefined,
      refreshComments: 0,
      pid: Number(
        window.location.pathname.replace(/^\/posts\/(.+)\/.+$/, '$1'),
      ),
    };
  }

  async componentDidMount() {
    try {
      const post = await posts.getPost({id: this.state.pid});
      this.setState({post});
    } catch (e) {
      error.Handle(e);
    }
  }

  render() {
    const p = this.state.post;
    const id = this.state.pid;
    return (
      <Page title={(p && p.title) || ''}>
        {p ? (
          <div style={{width: '100%'}}>
            <h4>
              {date.GMT(p.created).toDateString()}
              <br />
              {date.isGtDay(date.GMT(p.created), date.GMT(p.lastEdited)) ? (
                <em style={{fontWeight: 'normal', fontSize: 'smaller'}}>
                  (edited: {date.GMT(p.lastEdited).toDateString()})
                </em>
              ) : null}
            </h4>
            <div
              style={{wordBreak: 'break-word', fontSize: '14pt'}}
              dangerouslySetInnerHTML={{__html: converter.makeHtml(p.content)}}
            />
          </div>
        ) : null}
        <Comments id={id} _refresh={this.state.refreshComments} />
        <br />
        <h4>Join the discussion</h4>
        {window.app.state.authUser && window.app.state.authUser.id ? (
          <CreateCommentForm
            userId={window.app.state.authUser.id}
            postId={id}
            accessToken={window.app.state.authUser.accessToken}
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
      </Page>
    );
  }
}
