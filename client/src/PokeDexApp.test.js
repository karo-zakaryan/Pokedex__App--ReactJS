import React from 'react';
import ReactDOM from 'react-dom';
import PokeDexApp from './PokeDexApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PokeDexApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
