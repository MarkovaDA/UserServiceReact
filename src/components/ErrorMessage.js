import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorMessage extends Component {
  render() {
    return (
      <div>
        {
          this.props.isError &&
          <div className="ui negative message">
            Ошибка получения данных о пользователях
          </div>
        }
      </div>
    );
  }
}
ErrorMessage.propTypes = {
  isError: PropTypes.bool
};
export default ErrorMessage;