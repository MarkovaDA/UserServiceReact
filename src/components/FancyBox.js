import React from 'react';
import { Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class FancyBox extends React.Component {

  state = {
    isOpen: false
  };

  componentWillReceiveProps(props) {
    this.setState({
      isOpen: !!props.userInfo
    })
  }

  onClose = () => {
    this.setState({
      isOpen: false
    })
  };

  render() {
    const { data } = {...this.props.userInfo};

    return (
      <Modal closeIcon={true} open={this.state.isOpen} onClose={this.onClose} closeOnDocumentClick={true}>
        <Modal.Header>Информация о пользователе</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              {
                data && Object.keys(data).map(key =>
                  <div key={key} className="row-info-user">
                    <div className="row-key">
                      <b>
                        {key}:
                      </b>
                    </div>
                    <div className="row-value">
                      {data[key]}
                    </div>
                  </div>
                )
              }
            </Modal.Description>
      </Modal.Content>
     </Modal>
    )
  }
}

export default FancyBox;

FancyBox.propTypes = {
  userInfo: PropTypes.object
};