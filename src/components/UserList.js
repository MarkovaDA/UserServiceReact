import React from 'react';
import User from './User';
import { connect } from 'react-redux';
import { CallPopupAction } from "../actions/action"

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
      const userId = newProps.clickedItemInfo.id;
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
}

export default connect(
  state => ({
    clickedItemInfo: state.info
  }),
  dispatch => ({
    loadItemDescription: (itemInfo) => {
      console.log('dispatch', itemInfo);
      //dispatch(CallPopupAction(itemInfo));
      //dispatch({type: 'CALL_POPUP', data: itemInfo});
    }
  })
)(UserList);