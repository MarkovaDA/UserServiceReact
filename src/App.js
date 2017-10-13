import React, { Component } from 'react';
import UserList  from './components/UserList';
import 'semantic-ui-css/semantic.min.css';
import 'semantic-ui-css/semantic.min';
import './style.css';

class App extends Component {

  render() {
    return (
      <div>
          <UserList />
      </div>
    );
  }
}

export default App;
