import React, { Component } from 'react';

class DataDisplayPattern extends React.Component {

  render() {
    const data = {...this.props.displayData};
    return (
      <div>
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
      </div>
    )
  }
}

export default DataDisplayPattern;