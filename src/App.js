import React, { Component } from 'react';
import UserList  from './components/UserList';
import GroupsFilter from './components/GroupsFilter';
import 'semantic-ui-css/semantic.min.css';
import 'semantic-ui-css/semantic.min';
import './style.css';

class App extends Component {

  render() {
    return (
      <div className="ui center container" >
        <div className="ui secondary pointing menu">
          <a className="ui active yellow item">
            <GroupsFilter />
          </a>
        </div>
        <div className="ui segment">
          <UserList />
        </div>
      </div>
    );
  }
}

export default App;
