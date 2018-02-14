import * as React from 'react';
import * as error from '../error';

declare global {
  interface Window {
    errorHandler: typeof error.Handle;
    Error: Error['constructor'];
  }
}

export class Editor extends React.Component<{}, {}> {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <iframe
        style={{border: 0, flex: 1}}
        src="/editor/app.html"
        ref={iframe => {
          if (iframe) {
            iframe.contentWindow.errorHandler = error.Handle;
            // overwriting iframe window constructors with parent constructors.
            // see notes on "multiple contexts" https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
            iframe.contentWindow.Error = Error;
            iframe.contentWindow.fetch = fetch;
          }
        }}
      />
    );
  }
}
