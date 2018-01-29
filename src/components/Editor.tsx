import * as React from 'react';

export class Editor extends React.Component<{}, {}> {
  render() {
    return <iframe style={{border: 0, flex: 1}} src="/editor/index.html" />;
  }
}
