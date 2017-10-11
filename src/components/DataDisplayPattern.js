import React, { Component } from 'react';
import '../templates/CustomTemplate';
import { customListTemplate } from "../templates/CustomTemplate";


class DataDisplayPattern extends Component {

  render() {
    const data = {...this.props.displayData};
    const renderedList = customListTemplate.generateListByObject(data);

    return (
      <ul className="info-list" dangerouslySetInnerHTML={{__html: renderedList}}>
      </ul>
    )
  }
}

export default DataDisplayPattern;