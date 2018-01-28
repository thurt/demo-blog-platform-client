import * as React from 'react';
import * as api from '../api';
import * as error from '../error';
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
      await api.streamRequest(api.basePath + '/posts', (pc: postChunk) => {
        this.setState({
          posts: (this.state.posts || []).concat(pc.value.result),
        });
      });

      // will be true when have finished fetching posts and there were no posts
      if (this.state.posts === undefined) this.setState({posts: []});
    } catch (e) {
      error.Handle(e);
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
