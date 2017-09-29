import React from 'react';
import User from './User';
import { connect } from 'react-redux';
import { CallPopupAction } from "../actions/CallPopupAction"
import find from 'lodash/find';
import omit from 'lodash/omit';

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'items': []
    };
  }

  componentDidMount() {
    //загружаем пользователей, подлежащих отображению
    this.getUsers();
  }

  render() {

    return (
      <div className = "user-container">
        {
          this.state.items.map((item, index) => <User user = {item} key = {index} />)
        }
      </div>
    );
  }

  componentWillUpdate(newProps) {
    const userId = newProps.clickedItem.id;
    this.getUserById(userId);
  }

  //получаем список пользователей
  getUsers() {
    fetch('/server/users.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({items: responseJson});
      })
      .catch((error) => {
        console.error(error);
      });
    ;
  }

  //получаем информацию о пользователе по id
  getUserById(id) {
    fetch('/server/description.json')
      .then((response) => response.json())
      .then((responseJson) => {
        //за исключением поля id, оно отображению не подлежит
        const itemInfo = omit(find(responseJson, {'id': id}), 'id');
        //оповещаем App о выбранном компоненте
        this.props.loadItemDescription(itemInfo);
      })
      .catch((error) => {
        console.error(error);
      });
    ;
  }
}

export default connect(
  state => ({
    clickedItem: state.item
  }),

  dispatch => ({
    loadItemDescription: (info) => {
      dispatch(CallPopupAction(info));
    }
  })
)(UserList);