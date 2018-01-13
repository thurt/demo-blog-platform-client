import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Homepage} from './Homepage';
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
        Component = Homepage;
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
