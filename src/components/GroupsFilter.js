import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as filterActions from '../actions/FilterByGroupAction';

class GroupFilter extends Component {

  onSelectItem(groupId) {
    //console.log(groupId);
    this.props.filterActions.filterUsersByGroup(groupId);
  }

  render() {
    const groupOptions = [
      {
        text: 'All users',
        value: 0
      },
      {
        text: 'Beginners',
        value: 1
      },
      {
        text: 'Pre-Intermediate',
        value: 2
      },
      {
        text: 'Intermediate',
        value: 3
      },
      {
        text: 'Upper-intermediate',
        value: 4
      },
      {
        text: 'Advanced',
        value: 5
      },
      {
        text: 'Proficiency',
        value: 6
      }
    ];
    return (
      <Dropdown text='Группы' icon='filter' className='icon'>
        <Dropdown.Menu>
          <Dropdown.Header icon='tags' content='фильтрация по группам' />
          {
            groupOptions.map(option => <Dropdown.Item onClick={(groupId) => this.onSelectItem(option.value)} key={option.value} {...option} />)
          }
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default connect(
  state => ({

  }),
  dispatch => ({
    filterActions: bindActionCreators(filterActions, dispatch)
  })
)(GroupFilter);