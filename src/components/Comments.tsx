import * as React from 'react';
import {streamRequest, basePath} from '../api';
import * as error from '../error';
import {CmsComment} from 'cms-client-api';

type commentChunk = {
  done: boolean;
  value: {result: CmsComment};
};

type State = {
  cs: Array<CmsComment>;
};

type Props = {
  id: number;
};

export class Comments extends React.Component<Props, State> {
  constructor(p: Props) {
    super(p);
    this.state = {cs: undefined};
  }

  async componentDidMount() {
    try {
      await streamRequest(
        basePath + '/posts/' + this.props.id + '/comments',
        (cc: commentChunk) => {
          this.setState({
            cs: (this.state.cs || []).concat(cc.value.result),
          });
        },
      );

      // will be true when have finished fetching posts and there were no posts
      if (this.state.cs === undefined) this.setState({cs: []});
    } catch (e) {
      error.Handle(e);
    }
  }

  render() {
    const cs = this.state.cs;
    return (
      <div>
        <h3>Comments</h3>
        {cs === undefined ? <em>Loading...</em> : null}
        {cs && cs.length === 0 ? <em>This post has no comments yet!</em> : null}
        {cs &&
          cs.map((c, i) => {
            return (
              <div key={c.id}>
                <h4>
                  <em style={{fontWeight: 'normal', fontSize: 'smaller'}}>
                    {c.created}
                  </em>
                  <br />
                  <a href={`/users/${c.user_id}`}>{c.user_id}</a> wrote...
                </h4>
                <p>{c.content}</p>
              </div>
            );
          })}
      </div>
    );
  }
}
