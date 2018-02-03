import * as React from 'react';
import {streamRequest, basePath} from '../api';
import * as error from '../error';
import {CmsPost} from 'cms-client-api';
import * as date from '../date';

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
      await streamRequest(basePath + '/posts', (pc: postChunk) => {
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
      <div style={{width: '100%'}}>
        <h2>Recent Posts</h2>
        <hr />
        {ps && ps.length === 0 ? <em>This blog has no posts yet!</em> : null}
        {ps &&
          ps.map((p, i) => {
            return (
              <div key={p.id} style={{display: 'flex'}}>
                <h4>{date.GMT(p.created).toLocaleDateString() + ' '}</h4>
                <h4 style={{paddingLeft: '0.5em', wordBreak: 'break-word'}}>
                  <a
                    href={`/posts/${p.id}/${p.slug}`}
                    onClick={e => {
                      e.preventDefault();
                      window.app.pushState({}, `/posts/${p.id}/${p.slug}`);
                    }}>
                    {p.title}
                  </a>
                </h4>
              </div>
            );
          })}
      </div>
    );
  }
}
