import * as api from 'cms-client-api';
import ndjsonStream = require('can-ndjson-stream'); // This file should be imported using the CommonJS-style
import * as nprogress from 'nprogress';

let activeReqs = 0;
const maybeStartProgressIndicator = () => {
  if (activeReqs++ === 0) {
    setTimeout(() => {
      if (activeReqs !== 0 && !nprogress.isStarted()) {
        nprogress.start();
      }
    }, 500);
  }
};

const maybeDoneProgressIndicator = () => {
  if (--activeReqs === 0) {
    nprogress.done();
    return true;
  }
  return false;
};
const maybeAbortProgressIndicator = () => {
  if (--activeReqs === 0) {
    nprogress.done();
    nprogress.remove();
    return true;
  }
  return false;
};
const maybeIncProgressIndicator = () => {
  if (nprogress.isStarted()) {
    nprogress.inc();
    return true;
  }
  return false;
};

const ph: ProxyHandler<
  api.PostsApi | api.UsersApi | api.AuthApi | api.CommentsApi | api.SetupApi
> = {
  get(target, name, receiver) {
    return (...args: any[]) => {
      maybeStartProgressIndicator();
      //@ts-ignore
      return target[name](...args)
        .then((_: any) => {
          if (!maybeDoneProgressIndicator()) {
            maybeIncProgressIndicator();
          }
          return _;
        })
        .catch((_: any) => {
          maybeAbortProgressIndicator();
          return Promise.reject(_);
        });
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
export interface Error {
  error: string;
  code: number;
}

type chunk = {
  done: boolean;
  value: any;
};

export async function streamRequest(
  path: string,
  cb: (c: chunk) => void,
): Promise<Array<any>> {
  maybeStartProgressIndicator();

  const r = await fetch(path);
  if (!r.ok) {
    throw r;
  }

  const reader = ndjsonStream(r.body).getReader();

  const results = [];
  let c: chunk;
  while (true) {
    try {
      c = await reader.read();
      if (c.done) {
        maybeDoneProgressIndicator();
        break;
      }
      maybeIncProgressIndicator();
      results.push(cb(c));
    } catch (e) {
      maybeDoneProgressIndicator();
      throw e;
    }
  }
  return results;
}
