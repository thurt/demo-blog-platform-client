import * as api from './api';
import * as status from 'http-status-codes';

const notifyGenericServerErr = () => {
  window.Notify.addNotification({
    title: 'Server Error',
    message:
      'Sorry, something went wrong when trying to communicate with the server. Please try again later.',
    level: 'error',
  });
};

export function Handle(e: Error | Response) {
  if (e instanceof Error) {
    console.error(e);
    notifyGenericServerErr();
  }
  if (e instanceof Response) {
    e
      .json()
      .then((apie: api.Error) => {
        if (e.status === status.INTERNAL_SERVER_ERROR) {
          notifyGenericServerErr();
          return;
        }

        if (typeof apie.error === 'string') {
          window.Notify.addNotification({
            // in http/1.1, the Response.statusText  is included, however http/2 no longer includes
            // a status phrase so Response.statusText is always empty string
            // see https://github.com/http2/http2-spec/issues/202
            title: status.getStatusText(e.status),
            message: apie.error,
            level: 'error',
          });
        } else if (typeof apie.error === 'object') {
          window.Notify.addNotification({
            // in http/1.1, the Response.statusText  is included, however http/2 no longer includes
            // a status phrase so Response.statusText is always empty string
            // see https://github.com/http2/http2-spec/issues/202
            title: status.getStatusText(e.status),
            message: apie.error.message,
            level: 'error',
          });
        } else {
          throw 'Unrecognized api.error type';
        }

        // redirects to Login when token is invalid
        if (e.status === status.UNAUTHORIZED) {
          window.app.pushState(
            {authUser: undefined},
            `/login?referrer=${window.location.pathname}`,
          );
          return;
        }

        // redirects to Home when token does not have sufficient priviledge or token is missing
        if (e.status === status.FORBIDDEN) {
          window.app.pushState({}, '/');
          return;
        }
      })
      .catch(parsee => {
        console.error(parsee);
        notifyGenericServerErr();
      });
  }
}
