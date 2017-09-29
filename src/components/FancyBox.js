import React from 'react';
import { Modal } from 'semantic-ui-react';
import keys from 'lodash/keys';
import { connect } from 'react-redux';

class FancyBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        modal: false
    };
  }

  componentWillReceiveProps() {
      if (this.props.info.fields) {
        //получение новых свойств для отображения (информации о пользователе)
        this.show();
      }
  }

  render() {
    const data = this.props.info.fields;

    return (
      <div>
        <Modal closeIcon = {true} open = {this.state.modal} onClose = { this.close } closeOnDocumentClick = {true}>
          <Modal.Header>Информация о пользователе</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              {
                keys(data).map(key =>
                  <div key = {key} className = "row-info-user">
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
      </div>
    )
  }

  show = () => {
    this.setState({
        modal: true
    });
  };

  close = () => {
    this.setState({
        modal: false
    });
  }
}

export default connect(
    state => ({
        //получаем  из хранилища описание юзера, на который кликнули
        info: state.issue
    }),
    dispatch => ({})
)(FancyBox);