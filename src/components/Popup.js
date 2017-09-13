import React, { Component } from 'react';
import $ from 'jquery/dist/jquery.min';

class Popup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const popupStyle = {
      'top':'30%'
    };
    return (
      <div>
        <button className ="ui yellow button" onClick={this.showModal}>show modal</button>
          <div className ="ui modal" style = {popupStyle} >
            <i className = "close icon"></i>
            <div className = "header">
              Информация о пользователе
            </div>
            <div className = "content">
              <div className ="description">
                Описание
              </div>
            </div>
            <div className = "actions">
              <div className = "ui button" onClick={this.closeModal}>OK</div>
            </div>
        </div>
      </div>
    );
  }

  showModal() {
    $('.ui.modal').fadeIn(300);
  }

  closeModal() {
    $('.ui.modal').fadeOut(200);
  }
}
export default Popup;