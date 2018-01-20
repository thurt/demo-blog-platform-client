import * as React from 'react';
import * as ndjsonStream from 'can-ndjson-stream';
import * as api from '../api';
import {CmsPost} from 'cms-client-api';

type postChunk = {
  done: boolean;
  value: CmsPost;
};

export class Posts extends React.Component<{}, {}> {
  static onReceivePost(r: ReadableStream) {
    return (p: postChunk) => {
      if (p.done) {
        console.log('stream complete');
        return;
      }
      console.log('got value:', p.value);
      r
        .getReader()
        .read()
        .then(Posts.onReceivePost(r));
    };
  }

  async componentDidMount() {
    try {
      const r = await fetch(api.basePath + '/posts');
      if (!r.ok) {
        throw r;
      }

      const postStream = ndjsonStream(r.body).getReader();

      let result: postChunk;
      while (!result || !result.done) {
        result = await postStream.read();
        console.log(result.done, result.value);
      }
    } catch (e) {
      api.handleError(e);
    }
  }

  render() {
    return <div>Posts</div>;
  }
}
