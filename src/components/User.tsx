import * as React from 'react';
import {posts, users, streamRequest, basePath} from '../api';
import * as error from '../error';
import {CmsUser, CmsComment, CmsPost} from 'cms-client-api';
import {Page} from './Page';
import * as date from '../date';

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
      await Promise.all([
        users.getUser({id}).then(user => this.setState({user})),
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
        ),
      ]);

      // will be true when have finished fetching comments and there were no comments
      if (this.state.comments === undefined) {
        this.setState({comments: []});
      }
    } catch (e) {
      error.Handle(e);
    }
  }

  static onDeleteUser(u: CmsUser) {
    return async (e: React.MouseEvent<HTMLButtonElement>) => {
      const b = e.currentTarget;
      let msg: string;
      let newStateOnSuccess: {[prop: string]: any};

      if (u.role === 'ADMIN') {
        msg =
          'Deleting the admin account will require you to go through the setup process again before your blog can be used.\n\nDeleting this account does not affect any pre-existing posts, comments, and other user accounts. Only comments that have been added by this admin account will be deleted.\n\nAre you sure you want to delete this account?';
        newStateOnSuccess = {authUser: undefined, isSetup: false};
      } else {
        msg =
          'Any comments that have been added with this account will also be deleted.\n\nAre you sure you want to delete this account?';
        newStateOnSuccess = {authUser: undefined};
      }

      if (window.confirm(msg)) {
        b.disabled = true;
        try {
          await users.deleteUser(
            {id: u.id},
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
            message: 'User account was deleted',
            level: 'success',
          });
          window.app.pushState(newStateOnSuccess, '/');
        } catch (e) {
          error.Handle(e);
          b.disabled = false;
        }
      }
    };
  }

  render() {
    const u = this.state.user;
    const cs = this.state.comments;
    const ps = this.state.posts;
    return (
      <Page>
        <h2>User Profile</h2>
        {u === undefined ? <em>Loading...</em> : null}
        {u ? (
          <div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <h3
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                {u.id} (<a href={`mailto:${u.email}`}>{u.email}</a>)
              </h3>
              {window.app.state.authUser &&
              window.app.state.authUser.id === u.id ? (
                <button
                  style={{alignSelf: 'center'}}
                  className="btn btn-danger btn-sm"
                  onClick={User.onDeleteUser(u)}>
                  Delete account
                </button>
              ) : null}
            </div>
            <hr />
            <ul>
              <li>Role: {u.role}</li>
              <li>Member Since: {date.GMT(u.created).toLocaleDateString()}</li>
              <li>
                Last Active: {date.GMT(u.last_active).toLocaleDateString()}
              </li>
            </ul>
          </div>
        ) : null}
        <h3>Recent Comments</h3>
        {cs === undefined ? <em>Loading...</em> : null}
        {cs && cs.length === 0 ? <em>This user has no comments!</em> : null}
        {cs &&
          cs.map((c, i) => {
            return (
              <div key={c.id} style={{marginLeft: '1vw'}}>
                <h5
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                  <em>
                    {date.GMT(c.created).toLocaleDateString()}
                    <br />
                    {'in '}
                    <a
                      href={`/posts/${c.post_id}/${ps[Number(c.post_id)].slug}`}
                      onClick={e => {
                        e.preventDefault();
                        window.app.pushState(
                          {},
                          `/posts/${c.post_id}/${ps[Number(c.post_id)].slug}`,
                        );
                      }}>
                      {ps[Number(c.post_id)].title}
                    </a>
                  </em>
                </h5>
                <p>{c.content}</p>
              </div>
            );
          })}
      </Page>
    );
  }
}
