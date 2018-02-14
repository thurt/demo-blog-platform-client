import * as api from 'cms-client-api';
import ndjsonStream = require('can-ndjson-stream'); // This file should be imported using the CommonJS-style
import * as nprogress from 'nprogress';

class ProgressIndicator {
  activeReqs: number;
  constructor() {
    this.activeReqs = 0;
  }
  start() {
    if (this.activeReqs++ === 0) {
      setTimeout(() => {
        if (
          this.activeReqs !== 0 &&
          !nprogress.isStarted() &&
          window.navigator.onLine
        ) {
          nprogress.start();
        }
      }, 500);
    }
  }
  done() {
    if (--this.activeReqs === 0) {
      nprogress.done();
      return true;
    }
    return false;
  }
  abort() {
    if (--this.activeReqs === 0 || !window.navigator.onLine) {
      nprogress.done();
      nprogress.remove();
      return true;
    }
    return false;
  }
  inc() {
    if (nprogress.isStarted()) {
      nprogress.inc();
      return true;
    }
    return false;
  }
}

const pi = new ProgressIndicator();

const ph: ProxyHandler<
  api.PostsApi | api.UsersApi | api.AuthApi | api.CommentsApi | api.SetupApi
> = {
  get(target, name, receiver) {
    return async (...args: any[]) => {
      pi.start();
      try {
        //@ts-ignore
        const r = await target[name](...args);
        if (!pi.done()) {
          pi.inc();
        }
        return r;
      } catch (e) {
        pi.abort();
        throw e;
      }
    };
  },
};

export const basePath = '/api';
export const posts = new Proxy(
  new api.PostsApi(undefined, basePath),
  ph,
) as api.PostsApi;
export const users = new Proxy(
  new api.UsersApi(undefined, basePath),
  ph,
) as api.UsersApi;
export const auth = new Proxy(
  new api.AuthApi(undefined, basePath),
  ph,
) as api.AuthApi;
export const comments = new Proxy(
  new api.CommentsApi(undefined, basePath),
  ph,
) as api.CommentsApi;
export const setup = new Proxy(
  new api.SetupApi(undefined, basePath),
  ph,
) as api.SetupApi;

// Error is the interface returned by the api in the response body when a request error has occurred. Common examples of request errors that would cause the server to respond with an Error would be when the the request contains invalid or missing values, or when a request is made for a non-existant entity.
export type Error = UnaryError | StreamError;

export interface UnaryError {
  error: string;
  code: number;
}

export interface StreamError {
  error: {
    grpc_code: number;
    http_code: number;
    message: string;
    http_status: string;
  };
}

export type Chunk<T> = {
  done: boolean;
  value: T;
};

export async function streamRequest(
  path: string,
  cb: (c: Chunk<any>) => any,
): Promise<Array<any>> {
  pi.start();

  const r = await fetch(path);
  if (!r.ok) {
    throw r;
  }

  const reader = ndjsonStream(r.body).getReader();

  const results = [];
  let c: Chunk<any>;

  try {
    while (true) {
      c = await reader.read();
      if (c.done) {
        pi.done();
        break;
      }
      pi.inc();
      results.push(cb(c));
    }
  } catch (e) {
    pi.abort();
    throw e;
  }
  return results;
}
