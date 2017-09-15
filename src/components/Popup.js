import React from 'react';
import $ from 'jquery/dist/jquery.min';


class Popup extends React.Component {


  render() {
    return (
      <div className ="ui modal" >
        <i className = "close icon" onClick={this.closeModal}></i>
        <div className = "header">
          Информация о пользователе
        </div>
        <div className = "content">
          <div className ="description">
            Описание {this.props.infoToDisplay}
          </div>
        </div>
        <div className = "actions">
          <div className = "ui button" onClick={this.closeModal}>OK</div>
        </div>
      </div>
    );
  }

  componentWillUpdate() {
    this.showModal();
  }

  updateView() {

  }

  showModal() {
    $('.ui.modal').fadeIn(300);
  }

  closeModal() {
    $('.ui.modal').fadeOut(200);
  }
}
export default Popup;
