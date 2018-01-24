import * as React from 'react';
import ndjsonStream = require('can-ndjson-stream'); // This file should be imported using the CommonJS-style
import * as api from '../api';
import {CmsUser, CmsComment} from 'cms-client-api';

type commentChunk = {
  done: boolean;
  value: {result: CmsComment};
};

type State = {
  user: CmsUser;
  comments: Array<CmsComment>;
};

export class User extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {user: undefined, comments: undefined};
  }

  async componentDidMount() {
    const path = window.location.pathname;
    const id = path.replace(/\/users\//, '');
    try {
      const user = await api.request.getUser({id});
      this.setState({user});

      const r = await fetch(api.basePath + path + '/comments');
      if (!r.ok) {
        throw r;
      }

      const cr = ndjsonStream(r.body).getReader();

      let cc: commentChunk;
      while (true) {
        cc = await cr.read();
        if (cc.done) {
          break;
        }

        this.setState({
          comments: (this.state.comments || []).concat(cc.value.result),
        });
      }
      // will be true when have finished fetching comments and there were no comments
      if (this.state.comments === undefined) {
        this.setState({comments: []});
      }
    } catch (e) {
      api.handleError(e);
    }
  }

  render() {
    const u = this.state.user;
    const cs = this.state.comments;
    return (
      <div>
        {u === undefined ? <em>Loading...</em> : null}
        {u ? (
          <div>
            <h2>User Profile: {u.id}</h2>
            <h3>
              <a href={`mailto:${u.email}`}>{u.email}</a>
            </h3>
            <ul>
              <li>Role: {u.role}</li>
              <li>Member Since: {u.created}</li>
              <li>Last Active: {u.last_active}</li>
            </ul>
            <div>
              <h3>Recent Comments</h3>
              {cs === undefined ? <em>Loading...</em> : null}
              {cs && cs.length === 0 ? (
                <em>This user has no comments!</em>
              ) : null}
              {cs &&
                cs.map((c, i) => {
                  return (
                    <div key={c.id}>
                      <h3>
                        <a href={`/posts/${c.post_id}`}>{c.post_id}</a>
                      </h3>
                      <h4>Commented on: {c.created}</h4>
                      <p>{c.content}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
