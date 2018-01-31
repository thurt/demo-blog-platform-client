import * as React from 'react';
import {setup} from '../api';
import * as error from '../error';
import {RecentPosts} from './RecentPosts';

export class Home extends React.Component<{}, {}> {
  async componentDidMount() {
    if (window.app.state.isSetup === undefined) {
      try {
        const isSetup = await setup.isSetup();
        // using type guard to notify tsc that isSetup is actually a boolean even though isSetup() is typed to return "{value: boolean}".
        // there is a bug in the server package grpc-gateway that does not handle well-known types from protobuf/wrappers.proto properly
        // https://github.com/grpc-ecosystem/grpc-gateway/pull/412
        if (typeof isSetup !== 'boolean') {
          error.Handle(
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
        error.Handle(e);
      }
    }
  }

  render() {
    return (
      <div style={{display: 'flex', flex: 1}}>
        {window.app.state.isSetup === true ? (
          <RecentPosts />
        ) : (
          <em>Loading...</em>
        )}
      </div>
    );
  }
}
