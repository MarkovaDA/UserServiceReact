import React, { Component } from 'react';
import UserList  from './components/UserList';
import Popup from './components/Popup';

import 'semantic-ui-css/semantic.min.css';
import 'semantic-ui-css/semantic.min'


class App extends Component {

  render() {
    const segmentStyle = {
      'marginTop': '50px',
      'width': '60%'
    }
    return (
      <div className = "ui center container" style = {segmentStyle}>
        <div className ="ui secondary pointing menu">
          <a className = "active yellow item">
            Пользователи
          </a>
          <div className ="right menu">
            <a className ="ui item">
              Выход
            </a>
          </div>
        </div>
        <div className= "ui segment">
          <UserList />
        </div>
        <Popup />
      </div>
    );
  }
}

export default App;
