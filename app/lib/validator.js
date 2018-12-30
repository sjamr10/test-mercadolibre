import isEmpty from 'validator/lib/isEmpty';
import isAlpha from 'validator/lib/isAlpha';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import isBoolean from 'validator/lib/isBoolean';
import isBase64 from 'validator/lib/isBase64';
import isDataURI from 'validator/lib/isDataURI';
import isJSON from 'validator/lib/isJSON';
import escape from 'validator/lib/escape';
import unescape from 'validator/lib/unescape';
import trim from 'validator/lib/trim';

const isNil = (value) => value === undefined || value === null;

export default {
  isEmpty,
  isAlpha,
  isAlphanumeric,
  isBoolean,
  isBase64,
  isDataURI,
  isJSON,
  isNil,
  escape,
  unescape,
  trim,
};
