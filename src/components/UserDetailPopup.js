import React from 'react';
import { Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import DataDisplayPattern from './DataDisplayPattern';

class UserDetailPopup extends React.Component {

  state = {
    isOpen: false
  };

  componentWillReceiveProps(props) {
    this.setState({
      isOpen: !!props.userDetail
    })
  }

  onClose = () => {
    this.setState({
      isOpen: false
    })
  };

  render() {
    //const { data } = {...this.props.userInfo}; with redux
    const { data } = {...this.props.userDetail}
    return (
      <Modal closeIcon={true} open={this.state.isOpen} onClose={this.onClose} closeOnDocumentClick={true}>
        <Modal.Header>Информация о пользователе</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <DataDisplayPattern displayData={data} />
            </Modal.Description>
      </Modal.Content>
     </Modal>
    )
  }
}

UserDetailPopup.propTypes = {
  userDetail: PropTypes.object
};

export default UserDetailPopup;
