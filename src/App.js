import React, { Component } from 'react';
import UserList  from './components/UserList';
import Popup from './components/Popup';
import { connect } from 'react-redux';

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
          <div className ="right menu">
            <a className ="ui item">
              Выход
            </a>
          </div>
        </div>
        <div className= "ui segment">
          <UserList />
        </div>
        <Popup displayInfo = {JSON.stringify(this.props.info)} />
      </div>
    );
  }
}

export default connect(
  state => ({
    //получаем описание юзера для отображения в popup
    info: state.issue
  }),
  dispatch => ({})
)(App);
