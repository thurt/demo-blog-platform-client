import * as React from 'react';
import ndjsonStream = require('can-ndjson-stream'); // This file should be imported using the CommonJS-style
import * as api from '../api';
import {CmsPost} from 'cms-client-api';

type postChunk = {
  done: boolean;
  value: {result: CmsPost};
};

type State = {
  posts: Array<CmsPost>;
};

export class RecentPosts extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {posts: undefined};
  }

  async componentDidMount() {
    try {
      const r = await fetch(api.basePath + '/posts');
      if (!r.ok) {
        throw r;
      }

      const pr = ndjsonStream(r.body).getReader();

      let pc: postChunk;
      while (true) {
        pc = await pr.read();
        if (pc.done) {
          break;
        }

        this.setState({
          posts: (this.state.posts || []).concat(pc.value.result),
        });
      }
      // will be true when have finished fetching posts but there were no posts
      if (this.state.posts === undefined) this.setState({posts: []});
    } catch (e) {
      api.handleError(e);
    }
  }

  render() {
    const ps = this.state.posts;
    return (
      <div>
        <h3>Recent Posts</h3>
        {ps === undefined ? <em>Loading...</em> : null}
        {ps && ps.length === 0 ? <em>This blog has no posts yet!</em> : null}
        {ps &&
          ps.map((p, i) => {
            return (
              <div key={p.id}>
                <h4>
                  <a href={`/posts/${p.slug}`}>{p.title}</a>
                </h4>
                <p>{p.created}</p>
              </div>
            );
          })}
      </div>
    );
  }
}
