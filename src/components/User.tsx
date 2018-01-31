import * as React from 'react';
import {posts, users, streamRequest, basePath} from '../api';
import * as error from '../error';
import {CmsUser, CmsComment, CmsPost} from 'cms-client-api';

type commentChunk = {
  done: boolean;
  value: {result: CmsComment};
};

type State = {
  user: CmsUser;
  comments: Array<CmsComment>;
  posts: {[id: number]: CmsPost};
};

export class User extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {user: undefined, comments: undefined, posts: undefined};
  }

  async componentDidMount() {
    const path = window.location.pathname;
    const id = path.replace(/\/users\//, '');
    try {
      const user = await users.getUser({id});
      this.setState({user});

      await streamRequest(
        basePath + path + '/comments',
        async (cc: commentChunk) => {
          const c = cc.value.result;
          try {
            const p = await posts.getPost({id: Number(c.post_id)});
            this.setState({
              comments: (this.state.comments || []).concat(cc.value.result),
              posts: {...this.state.posts, [p.id]: p},
            });
          } catch (e) {
            error.Handle(e);
          }
        },
      );
      // will be true when have finished fetching comments and there were no comments
      if (this.state.comments === undefined) {
        this.setState({comments: []});
      }
    } catch (e) {
      error.Handle(e);
    }
  }

  render() {
    const u = this.state.user;
    const cs = this.state.comments;
    const ps = this.state.posts;
    return (
      <div>
        <h2>User Profile</h2>
        {u === undefined ? <em>Loading...</em> : null}
        {u ? (
          <div>
            <h3>
              {u.id} (<a href={`mailto:${u.email}`}>{u.email}</a>)
            </h3>
            <ul>
              <li>Role: {u.role}</li>
              <li>Member Since: {u.created}</li>
              <li>Last Active: {u.last_active}</li>
            </ul>
          </div>
        ) : null}
        <h3>Recent Comments</h3>
        {cs === undefined ? <em>Loading...</em> : null}
        {cs && cs.length === 0 ? <em>This user has no comments!</em> : null}
        {cs &&
          cs.map((c, i) => {
            return (
              <div key={c.id}>
                <h4>
                  <em style={{fontWeight: 'normal', fontSize: 'smaller'}}>
                    {c.created}
                  </em>
                  <br />
                  {c.user_id + ' wrote... (in '}
                  <a
                    href={`/posts/${ps[Number(c.post_id)].slug}`}
                    onClick={e => {
                      e.preventDefault();
                      window.app.pushState(
                        {},
                        `/posts/${ps[Number(c.post_id)].slug}`,
                      );
                    }}>
                    {ps[Number(c.post_id)].title}
                  </a>
                  {')'}
                </h4>
                <p>{c.content}</p>
              </div>
            );
          })}
      </div>
    );
  }
}
