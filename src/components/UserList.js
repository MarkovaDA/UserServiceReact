import React from 'react';
import User from './User';

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
      <div>
        {
          this.state.items.map((item, index) => <User user = {item} key = {index} />)
        }
      </div>
    );
  }
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
}
export default UserList;