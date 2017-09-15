import React, { Component } from 'react';
import UserList  from './components/UserList';
import Popup from './components/Popup';
import { connect } from 'react-redux';

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
          <div className ="right menu">
            <a className ="ui item">
              Выход
            </a>
          </div>
        </div>
        <div className= "ui segment">
          <UserList />
        </div>
        <Popup info = 'информация пока не получена' />
      </div>
    );
  }

  componentWillUpdate(newProps) {
    console.log('App, state:', newProps.itemInfo);
  }
}

export default connect(
  state => ({
    itemInfo: state
  }),
  dispatch => ({

  })
)(App);
