interface IOptions {
  prefix?: string;
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
  argsType: TypeError("Check the argument's types"),
  namespaceOnly: Error("It's not enough to provide a namespace only"),
  namespaceType: TypeError("Namespace must be a sting"),
  noargs: Error("Provide at least 2 strings as arguments"),
};

function actionTypes(
  namespace: string,
  second: string | string[],
  ...rest: Array<string | IOptions>,
): INamespacedStrings {
  if (arguments.length === 0) {
    throw errors.noargs;
  } else if (typeof namespace !== "string") {
    throw errors.namespaceType;
  } else if (arguments.length === 1) {
    throw errors.namespaceOnly;
  }
  let types = [second, ...rest];
  let options: IOptions = defaultOptions;
  if (typeof second === "string") {
    const body = rest.slice(0, -1);
    const tail = rest[rest.length - 1];
    if (isPlainObject(tail)) {
      types = [second, ...body];
      // TODO
      // @ts-ignore isPlainObject returns no ambient types
      options = { ...defaultOptions, ...tail };
    }
  } else if (Array.isArray(second)) {
    types = second;
    const passedOptions = rest[0];
    if (isPlainObject(passedOptions)) {
      // @ts-ignore isPlainObject returns no ambient types
      options = { ...defaultOptions, ...passedOptions };
    }
  } else {
    throw errors.argsType;
  }
  const { prefix, delimiter } = options;

  return types.reduce((obj: INamespacedStrings, shortForm: string) => {
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
