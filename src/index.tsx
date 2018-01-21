import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Store from './store';
import {Main} from './components/Main';

const s = Store.get('state');
if (s !== false) {
  // hydrate window.app.state
  console.log('hydrating window.app.state with store state', s);
  window.app.replaceState(JSON.parse(s));
}

ReactDOM.render(<Main />, document.getElementById('example'));
