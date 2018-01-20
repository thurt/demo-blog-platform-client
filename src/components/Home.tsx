import * as React from 'react';
import * as api from '../api';
import {LoginStatus} from './LoginStatus';

export class Home extends React.Component<{}, {}> {
  async componentDidMount() {
    if (window.app.state.isSetup === undefined) {
      try {
        const isSetup = await api.request.isSetup();
        // using type guard to notify tsc that isSetup is actually a boolean even though isSetup() is typed to return "{value: boolean}".
        // there is a bug in the server package grpc-gateway that does not handle well-known types from protobuf/wrappers.proto properly
        // https://github.com/grpc-ecosystem/grpc-gateway/pull/412
        if (typeof isSetup !== 'boolean') {
          api.handleError(
            new Error(
              'want "isSetup" to be typeof boolean, got typeof ' +
                typeof isSetup,
            ),
          );
          return;
        }
        isSetup
          ? window.app.replaceState({isSetup})
          : window.app.pushState({isSetup}, '/setup');
      } catch (e) {
        api.handleError(e);
      }
    }
  }

  render() {
    return (
      <div>
        {window.app.state.isSetup === true ? (
          <div>
            <h4>Homepage</h4>
            <LoginStatus />
          </div>
        ) : (
          <em>Loading...</em>
        )}
      </div>
    );
  }
}
