import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoadMessage extends Component {
  render() {
    return (
      <div>
        {
           this.props.isLoading && <div className="ui orange message">Загрузка данных...</div>
        }
      </div>
    );
  }
}
LoadMessage.propTypes = {
  isLoading: PropTypes.bool
};
export default LoadMessage;