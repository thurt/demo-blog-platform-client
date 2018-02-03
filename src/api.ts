import * as api from 'cms-client-api';
import ndjsonStream = require('can-ndjson-stream'); // This file should be imported using the CommonJS-style
import * as nprogress from 'nprogress';

let activeReqs = 0;
const ph: ProxyHandler<
  api.PostsApi | api.UsersApi | api.AuthApi | api.CommentsApi | api.SetupApi
> = {
  get(target, name, receiver) {
    return (...args: any[]) => {
      if (activeReqs++ === 0 && !nprogress.isStarted()) {
        nprogress.start();
      }
      //@ts-ignore
      return target[name](...args)
        .then((_: any) => {
          if (--activeReqs === 0) {
            nprogress.done();
          } else {
            nprogress.inc();
          }
          return _;
        })
        .catch((_: any) => {
          if (--activeReqs === 0) {
            nprogress.remove();
          }
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

export async function streamRequest(path: string, cb: (c: chunk) => void) {
  if (activeReqs++ === 0 && !nprogress.isStarted()) {
    nprogress.start();
  }

  const r = await fetch(path);
  if (!r.ok) {
    throw r;
  }

  const reader = ndjsonStream(r.body).getReader();

  let c: chunk;
  while (true) {
    c = await reader.read(); // i think this could throw; need to try catch here so can handle the nprogress for streamRequests
    if (c.done) {
      if (--activeReqs === 0) {
        nprogress.done();
      }
      break;
    }
    nprogress.inc();
    cb(c);
  }
}
