import React from 'react';
import $ from 'jquery/dist/jquery.min';
import isEmpty from 'lodash/isEmpty';
import keys from 'lodash/keys';

class Popup extends React.Component {

  render() {
    const data = JSON.parse(this.props.displayInfo).fields;

    if (isEmpty(data))
        return null;

    return (
      <div className ="ui modal" >
        <i className = "close icon" onClick={this.closeModal}></i>
        <div className = "header">
          Информация о пользователе
        </div>
        <div className = "content">
          <div className = "description">
            <table className="ui very basic table">
              <thbody>
              {
                keys(data).map(key =>
                  <tr key={key}>
                    <td><b>{key}:</b></td>
                    <td>{data[key]}</td>
                  </tr>)
              }
              </thbody>
            </table>
          </div>
          <div>
            <button className = "ui right floated button" onClick={this.closeModal}>OK</button>
            <br/>
          </div>
        </div>
      </div>
    );
  }

  componentWillUpdate() {
    this.showModal();
  }

  showModal() {
    $('.ui.modal').fadeIn(300);
  }

  closeModal() {
    $('.ui.modal').fadeOut(200);
  }
}
export default Popup;
