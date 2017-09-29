import React, { Component } from 'react';
import UserList  from './components/UserList';
import FancyBox from './components/FancyBox';
import 'semantic-ui-css/semantic.min.css';
import 'semantic-ui-css/semantic.min';
import './style.css';

class App extends Component {

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
        <FancyBox />
      </div>
    );
  }
}

export default App;
