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
        'div.section#wrapper': {
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
    const schema2 = {
      'div#block1.commonClass': {
        'span':'user.firstname'
      },
      'div#block2.commonClass': 'user.lastname',
      'p#funcRes': () => {
        return {
        'span': {
          'a.edu':'user.education.university_name',
          'a.age': () => { return 25/2 }
          }
        }
      }
    };
    console.log(this.buildHtmlBySchema(source,schema2));
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
      const openTag = this.expandTag(key, true);
      const closeTag = this.expandTag(key, false);
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
          let result = value.call(this);
          //function value is plain
          if (!isObject(result)) {
            html = html.concat(`${openTag}${value.call(this)}${closeTag}`);
          }
          else {
            //function value is nested object
            html = html.concat(`${openTag}${this.buildHtmlBySchema(source, value.call(this))}${closeTag}`);
          }
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

  //разворачиваем представление тега вместе с его атрибутами
  expandTag = (shortTag, isOpenTag = true) => {
    const rules = {'.': 'class=', '#': 'id=', '~': 'style='};
    const searchPattern = new RegExp(/[^#,.,~]+/g);
    let values = words(shortTag, searchPattern);
    const keys = split(shortTag, searchPattern);

    if (!isOpenTag) {
      values =  values.slice(0,1);
    }

    let resString = `<`;
    let key, value;
    for(let i=0; i < values.length; i++) {
      key = rules[keys[i]];
      value = values[i];
      if (!isEmpty(key)) {
        resString += ` ${key}"${value}"`;
      }
      else if (!isEmpty(value)) {
        resString += `${value}`;
      }
    }
    let closeTag = (isOpenTag) ? '>': '/>';
    resString += closeTag;
    return resString;
  };

}
export const customListTemplate = new CustomTemplate();