import * as React from 'react';
import {Home} from './Home';
import {Setup} from './Setup';
import {NotFound} from './NotFound';

interface Props {
  route: string;
}

export class Router extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    let Component;

    switch (this.props.route) {
      case '/':
        Component = Home;
        break;
      case '/setup':
        Component = Setup;
        break;
      default:
        Component = NotFound;
        break;
    }

    return (
      <div>
        <Component />
      </div>
    );
  }
}
