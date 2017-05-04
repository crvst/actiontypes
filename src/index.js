import isPlainObject from 'lodash.isplainobject';

const defaultOptions = {
  prefix: '',
  delimiter: '/',
};
const errors = {
  noargs: Error('Provide at least 2 strings as arguments'),
  namespaceOnly: Error('It\'s not enough to provide the namespace only'),
  types: TypeError('Only strings are allowed as identifiers')
};
const actionTypes = (namespace, ...rest) => {
  if (typeof namespace !== 'string') {
    throw errors.types;
  }
  if (arguments.length === 0) {
    throw errors.noargs;
  } else if (arguments.length === 1) {
    throw errors.namespaceOnly;
  }
  let actions = rest;
  let options = defaultOptions;
  const body = rest.slice(0, -1);
  const tail = rest[rest.length - 1];
  if (typeof tail === 'string') {
    /* Do nothing. Most common scenario */
  } else if (isPlainObject(tail)) {
    actions = body;
    options = Object.assign({}, defaultOptions, tail);
  } else {
    throw errors.types;
  }
  const { prefix, delimiter } = options;

  return actions.reduce((obj, shortForm) => {
    const forcedUppercaseForm = shortForm.toUpperCase();
    /*
     * Skip and do not overwrite constants that has been already declared without any warning
     * */
    if (!obj.hasOwnProperty(forcedUppercaseForm)) {
      Object.defineProperty(obj, forcedUppercaseForm, {
        value: prefix + namespace + delimiter + forcedUppercaseForm,
        enumerable: true,
      });
    }
    return obj;
  }, {});
};

export default actionTypes;
