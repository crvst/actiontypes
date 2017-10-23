# `actiontypes`

A dead simple a bit opinionated utility to generate namespaced strings for Flux standard actions.

## Usage

### Basic

```js
import actionTypes from 'actiontypes';

const actions = actionTypes(
  'simple',
  'HELLO',
  'THERE'
);
```

You'll got:

```js
console.log(actions);
```

```js
{
  HELLO: 'simple/HELLO',
  THERE: 'simple/THERE'
}
```


### Configuration

```js
import actionTypes from 'actiontypes';

const actions = actionTypes(
    'namespace', // Mandatory
    'OPEN', // At least one string must be provided
    'CLOSE',
    'close', // Skips duplicates
    'tYPO', // Forces uppercase
    'TOGGLE',
    {
       prefix: '@@', // Optional. Prepends to all strings
       delimeter: '--', // Optional. Separator between namespace and short form, default is `/`
    }
);
```

And you'll got:

```
console.log(actions);
```

```
{
  OPEN: '@@namespace--OPEN',
  CLOSE: '@@namespace--CLOSE',
  TYPO: '@@namespace--TYPO',
  TOGGLE: '@@namespace--TOGGLE'
}
```
