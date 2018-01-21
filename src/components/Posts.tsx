import * as React from 'react';
import ndjsonStream = require('can-ndjson-stream'); // This file should be imported using the CommonJS-style
import * as api from '../api';
import {CmsPost} from 'cms-client-api';

type postChunk = {
  done: boolean;
  value: CmsPost;
};

export class Posts extends React.Component<{}, {}> {
  async componentDidMount() {
    try {
      const r = await fetch(api.basePath + '/posts');
      if (!r.ok) {
        throw r;
      }

      const pr = ndjsonStream(r.body).getReader();

      let pc: postChunk;
      while (!pc || !pc.done) {
        pc = await pr.read();
        console.log(pc.done, pc.value);
      }
    } catch (e) {
      api.handleError(e);
    }
  }

  render() {
    return <div>Posts</div>;
  }
}
