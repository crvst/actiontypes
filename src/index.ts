interface IOptions {
  prefix: string;
  delimiter?: string;
}

interface INamespacedStrings {
  [type: string]: string;
}

// tslint:disable no-var-requires
const isPlainObject = require("lodash.isplainobject");
const defaultOptions: IOptions = {
  delimiter: "/",
  prefix: "",
};
const errors = {
  namespaceOnly: Error(`It's not enough to provide a namespace only`),
  noargs: Error(`Provide at least 2 strings as arguments`),
  types: TypeError(`Namespace and short forms must be stings and options must be a plain object`),
};

function actionTypes(namespace: string, ...rest: Array<string | IOptions>): INamespacedStrings {
  if (typeof namespace !== "string") {
    throw errors.types;
  }
  if (arguments.length === 0) {
    throw errors.noargs;
  } else if (arguments.length === 1) {
    throw errors.namespaceOnly;
  }
  let actions = rest;
  let options: IOptions = defaultOptions;
  const body = rest.slice(0, -1);
  const tail: IOptions | string = rest[rest.length - 1];
  if (isPlainObject(tail)) {
    actions = body;
    // TODO
    // @ts-ignore isPlainObject return no ambient types
    options = { ...defaultOptions, ...tail };
  } else if (typeof tail !== "string") {
    throw errors.types;
  }
  const { prefix, delimiter } = options;

  return actions.reduce((obj: INamespacedStrings, shortForm: string) => {
    const forcedUppercaseForm = shortForm.toUpperCase();
    /*
     * Skip and do not overwrite constants that have been already declared without any warning
     * */
    if (!obj.hasOwnProperty(forcedUppercaseForm)) {
      Object.defineProperty(obj, forcedUppercaseForm, {
        enumerable: true,
        value: prefix + namespace + delimiter + forcedUppercaseForm,
      });
    }
    return obj;
  }, {});
}

export default actionTypes;
