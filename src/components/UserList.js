import React from 'react';
import User from './User';
import { connect } from 'react-redux';
import { CallPopupAction } from "../actions/CallPopupAction"

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'items': []
    };
  }
  componentDidMount() {
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
    //получаем дополнительную информацию о пользователе
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
        const itemInfo = responseJson.filter((item) => item.id === id)[0];
        this.props.loadItemDescription(itemInfo);
      })
      .catch((error) => {
        console.error(error);
      });
    ;
  }
  //конфертация описания пользователя в строку
  formatUserIssue() {

  }
}

export default connect(
  state => ({
    clickedItem: state.item
  }),
  dispatch => ({
    loadItemDescription: (info) => {
      //console.log(CallPopupAction(info));
      dispatch(CallPopupAction(info));
    }
  })
)(UserList);