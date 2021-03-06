import * as React from 'react';
import {Home} from './Home';
import {Setup} from './Setup';
import {NotFound} from './NotFound';
import {Login} from './Login';
import {Post} from './Post';
import {User} from './User';
import {Editor} from './Editor';
import {CreateUser} from './CreateUser';

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
      case '/login':
        Component = Login;
        break;
      case '/editor':
        Component = Editor;
        break;
      case '/create-user':
        Component = CreateUser;
        break;
      default:
        if (this.props.route.includes('/posts/')) {
          Component = Post;
          break;
        } else if (this.props.route.includes('/users/')) {
          Component = User;
          break;
        }
        Component = NotFound;
        break;
    }

    return <Component />;
  }
}
