import {  forEach, isString, isObject, isArray, at,  isUndefined, split, isFunction, isEmpty, toUpper, words } from 'lodash';


class CustomTemplate {
  constructor() {
    const toUpperCase = (String) => {
      return toUpper(String);
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


    //можно передавать только простенькие функции, которые возвращают примитив
    //схема генерации разметки по данным
    const schema = {
      'div': {
        'a': () => { return toUpperCase(source.user.firstname) },
        'div.section': {
          'h2': [ {'b':'user.firstname'}, {'b':'user.lastname'} ],
          'div.center': {
            'p': {
              'span': {
                  'a': 'user.education.university_name'
               }},
            'h4':  'user.education.faculty',
            'h5':  'user.education.graduate_year'
          }
        }
      },
    };
    //console.log(this.buildHtmlBySchema(source,schema));
    console.log(this.expandAttributes('div.alerts'));

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

  buildHtmlBySchema = (source,schema) => {
    let html = ``;

    forEach(schema, (value, key) => {
      const openTag = this.expandOpenTags(key);
      const closeTag = this.expandCloseTags(key);

      //plain object
      if (!isObject(value) && !isFunction(value)) {
        let tagContent = `${at(source,value)}`;
        tagContent = (isEmpty(tagContent)) ? value : tagContent;
        html = html.concat(`${openTag}${tagContent}`);
      }
      //some elements by common tag
      if (isArray(value)) {
          forEach(value, (elem) => {
            html = html.concat(`${openTag}${this.buildHtmlBySchema(source,elem)}${closeTag}`);
          });
      }
      //nested object
      else if (isObject(value)) {
        //value is a function
        if (isFunction(value)) {
          html = html.concat(`${openTag}${value.call(this)}${closeTag}`);
        }
        else
          html = html.concat(`${openTag}${this.buildHtmlBySchema(source,value)}${closeTag}`);
      }
      //close parent tag
      if (!isObject(value) && !isArray(value)) {
        html = html.concat(closeTag);
      }
    });
    return html;
  };

  expandOpenTags = (tag) => {
    //крайне уродская функция для выделения тега и имени класса
    const params =  split(tag, '.');
    const tagName = params[0];
    const className = params[1];

    if (!isUndefined(className)) {
      return `<${tagName} class="${className}">`;
    }

    return `<${tag}>`;
  };

  expandCloseTags = (tag) => {
    //не менее уродская
    const params =  split(tag, '.');
    const tagName = params[0];
    const className = params[1];

    if (!isUndefined(className)) {
      return `</${tagName}>`;
    }

    return `</${tag}>`;
  };

  //разворачиваем теги и его атрибуты
  expandAttributes = (shortTag) => {
    const patternRules = {'.': 'class=', '#': 'id='};
    //тег без атрибутов
    if (!(/(#.+)|(\.+)/).test(shortTag)) {
      return `<${shortTag}>`;
    }
    const index = shortTag.match(/(#.+)|(\.+)/).index;
    const splitter = shortTag[index];
    const attribute = patternRules[splitter];
    const terms = words(shortTag, /[^#,. ]+/g);
    //пройтись в цикле и замапить все возможные теги
    return `<${terms[0]}  ${attribute}"${terms[1]}">`;
  };

}
export const customListTemplate = new CustomTemplate();