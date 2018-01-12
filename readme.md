# `actiontypes`

A simple utility to generate namespaced strings for Flux standard actions.

## Usage

`actionTypes(namespace, type1, [type2, ...] [, options])`

`actionTypes(namespace, typesArray, [, options])`

### Basic

```js
import actionTypes from "actiontypes";

const actions = actionTypes("namespace", "HELLO", "THERE");
```

You’ll got:

```js
console.log(actions);
```

```js
{
  HELLO: "namespace/HELLO",
  THERE: "namespace/THERE"
}
```

More:

```js
const actions = actionTypes(
  "namespace", // Mandatory
  "OPEN", // At least one string must be provided
  "CLOSE",
  "close", // Skips duplicates
  "tYPO", // Forces uppercase
);
```

```js
console.log(actions);
```

```js
{
  OPEN: "namespace/OPEN",
  CLOSE: "namespace/CLOSE",
  TYPO: "namespace/TYPO"
}
```

### Array of types

Also an array of types strings as a second argument can be passed:

```js
const actions = actionTypes("simple", ["HELLO", "THERE"]);
```

## Configuration

```js
import actionTypes from "actiontypes";

const actions = actionTypes("namespace", "INIT", {
    prefix: "@@", // Optional. Prepends to all strings. Default is `""`, an empty string.
    delimeter: "--", // Optional. Separator between namespace and short form. Default is `/`, a slash.
  }
);
```

And you’ll got:

```js
console.log(actions);
```

```js
{
  INIT: "@@namespace--INIT"
}
```
