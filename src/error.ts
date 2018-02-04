import * as api from './api';
import {getStatusText} from 'http-status-codes';

export function Handle(e: Error | Response) {
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
      .then((apie: api.Error) =>
        window.Notify.addNotification({
          // in http/1.1, the Response.statusText  is included, however http/2 no longer includes
          // a status phrase so Response.statusText is always empty string
          // see https://github.com/http2/http2-spec/issues/202
          title: e.statusText || getStatusText(e.status),
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
