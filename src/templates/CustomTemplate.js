import {  forEach, isString, isObject, isArray, split, map, reverse } from 'lodash';


class CustomTemplate {
  constructor() {
    //схема генерации разметки по данным
    const schema = {
      'div': {
        'div.section': {
          'h2': [ {'b':'firstname'}, {'b':'lastname'}],
          'div.center': {
            'h3': 'user.education.university_name',
            'h4': 'user.education.faculty',
            'h5': 'user.education.graduate_year'
          }
        }
      },
    };
    //источник данных
    const source = {
      user: {
        firstname: 'ivanov',
        lastname: 'petr',
        education: {
          university_name: 'VSU',
          faculty: 'CSF',
          graduate_year: '2015'
        }
      }
    };
    console.log(this.buildHtmlBySchema(source,schema));
    //console.log(this.expandCloseTags('div.span.b'));
  }
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

  /*ПРАВИЛА ГЕНЕРАЦИИ СХЕМЫ
  * допускается детальное уточнение членов объекта
  * если член объекта не уточнеен,то его значение формируется из родительского
  */
  buildHtmlBySchema = (source,schema) => {
    let html = ``;
    forEach(schema, (value, key) => {
      const openTag = this.expandOpenTags(key);
      const closeTag = this.expandCloseTags(key);
      //plain object
      if (!isObject(value)) {
        html = html.concat(`${openTag}${value}`);
      }
      //some elements by common tag
      if (isArray(value)) {
          forEach(value, (elem) => {
            html = html.concat(`${openTag}${this.buildHtmlBySchema(source,elem)}${closeTag}`);
          });
      }
      //nested object
      else if (isObject(value)) {
        //проверку можно перенести сюда
        html = html.concat(`${openTag}${this.buildHtmlBySchema(source,value)}${closeTag}`);
      }
      if (!isObject(value) && !isArray(value)) {
        html = html.concat(closeTag);
      }
    });
    return html;
  };

  expandOpenTags = (shortForm) => {
    const htmlTags = split(shortForm, '.');
    return htmlTags.map((elem) => {
      return `<${elem}>`
    }).join('');
  };

  expandCloseTags = (shortForm) => {
    const htmlTags = split(shortForm, '.');
    return reverse(htmlTags).map((elem) => {
      return `</${elem}>`
    }).join('');
  };

}
export const customListTemplate = new CustomTemplate();