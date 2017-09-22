import React, { Component } from 'react';
import UserList  from './components/UserList';
import Popup from './components/Popup';

import 'semantic-ui-css/semantic.min.css';
import 'semantic-ui-css/semantic.min';
import './style.css';

class App extends Component {
  constructor() {
    super();
  }

  render() {

    return (
      <div className = "ui center container" >
        <div className = "ui secondary pointing menu">
          <a className = "active yellow item">
            Пользователи
          </a>
        </div>
        <div className= "ui segment">
          <UserList />
        </div>
        <Popup  />
      </div>
    );
  }
}

export default App;
