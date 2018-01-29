import * as React from 'react';
import {posts} from '../api';
import * as error from '../error';
import {CmsPost} from 'cms-client-api';

type State = {
  post: CmsPost;
};

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
              Created: {p.created} (last edited: {p.last_edited})
            </h4>
            <div>{p.content}</div>
          </div>
        ) : null}
      </div>
    );
  }
}
