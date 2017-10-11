import {  forEach, isString, isObject } from 'lodash';


class CustomTemplate {

  generateListByObject = (source) => {
    let list = ``;
    forEach(source, (value, key) => {
      //отображаем только поля со строковым значением
      if (isString(value)) {
        list += `<li><b>${key}: </b><span>${value}</span></li>`;
      }
      else if (isObject(value)) {
        list += `<li><b>${key}: </b>`;
      }
      if (isObject(value)) {
        list += `<ul>${this.generateListByObject(value)}</ul></li>`;
      }
    });
    return list;
  };
}
export const customListTemplate = new CustomTemplate();