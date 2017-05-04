# `actiontypes`

A dead simple a bit opinionated utility to generate namespaced strings for Flux standard actions.

It works like this:

```js
import actionTypes from 'actiontypes';

export const STRING_CONSTANTS = actionTypes(
    'namespace', // Mandatory
    'OPEN', // At least one string must be provided
    'CLOSE',
    'CLOSE', // Skips the duplicates
    'tYPO', // Forces uppercase
    'TOGGLE',
    {
       prefix: '@@', // Optional. Prepends to all strings
       delimeter: '-', // Optional. Separator between namespace and short form, default is `/`
    }
);

const { OPEN } = STRING_CONSTANTS;

console.log(STRING_CONSTANTS);

/*
{ OPEN: '@@namespace/OPEN',
  CLOSE: '@@namespace/CLOSE',
  TYPO: '@@namespace/TYPO',
  TOGGLE: '@@namespace/TOGGLE' }
*/

console.log(OPEN);

/*
'@@namespace/OPEN'
*/

```
