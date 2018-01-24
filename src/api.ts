import * as api from 'cms-client-api';
import ndjsonStream = require('can-ndjson-stream'); // This file should be imported using the CommonJS-style

export const basePath = '/api';
export const request = api.CmsApiFactory(undefined, basePath);

type chunk = {
  done: boolean;
  value: any;
};
export async function streamRequest(path: string, cb: (c: chunk) => void) {
  const r = await fetch(path);
  if (!r.ok) {
    throw r;
  }

  const reader = ndjsonStream(r.body).getReader();

  let c: chunk;
  while (true) {
    c = await reader.read();
    if (c.done) {
      break;
    }
    cb(c);
  }
}

// apiError is the interface returned by the api in the response body when a request error has occurred. Common examples of request errors that would cause the server to respond with an apiError would be when the the request contains invalid or missing values, or when a request is made for a non-existant entity.
interface apiError {
  error: string;
  code: number;
}

export function handleError(e: Error | Response) {
  if (e instanceof Error) {
    console.error(e);
    window.Notify.addNotification({
      title: 'Server Error',
      message:
        'Sorry, something went wrong when trying to communicate with the server. Please try again later.',
      level: 'error',
    });
  }
  if (e instanceof Response) {
    e
      .json()
      .then((apie: apiError) =>
        window.Notify.addNotification({
          title: e.statusText,
          message: apie.error,
          level: 'error',
        }),
      )
      .catch(parsee => {
        console.error(parsee);
        window.Notify.addNotification({
          title: 'Server Error',
          message:
            'Sorry, something went wrong when trying to communicate with the server. Please try again later.',
          level: 'error',
        });
      });
  }
}
