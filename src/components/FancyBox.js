import React from 'react';
import { Modal } from 'semantic-ui-react';
import keys from 'lodash/keys';



class FancyBox extends React.Component {

  state = {
    isOpen: false//список всех пользователей
  };

  componentWillReceiveProps(props) {
    this.setState({
      isOpen: !!props.userInfo
    });
  }

  render() {
    const { data } = {...this.props.userInfo};

    return (
      <Modal closeIcon={true} open={this.state.isOpen} onClose={this.close} closeOnDocumentClick={true}>
        <Modal.Header>Информация о пользователе</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              {
                keys(data).map(key =>
                  <div key={key} className = "row-info-user">
                    <div className = "row-key">
                      <b>
                        {key}:
                      </b>
                    </div>
                    <div className = "row-value">
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

  close = () => {
    this.setState({
        isOpen: false
    });
  };
}
export default FancyBox;