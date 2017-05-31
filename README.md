# Deep-Sort
A handy array sorting utility for comparing arrays of objects.

## Quick Start
You can sort an array of objects based on one of its (nested) properties. Sorting behaviour is the same as `Array.sort()`. Arrays are sorted in place (the original array is mutated) and the result is returned. See the `/examples` directory for some working examples.

```javascript
const deepSort = require(`deep-sort`);

const myArray = [
	{ id: 1, nested: { time: 111, deeper: { text: `AAA` } } },
	{ id: 2, nested: { time: 222, deeper: { text: `BBB` } } },
	{ id: 3, nested: { time: 333, deeper: { text: `CCC` } } },
];

deepSort(myArray, `id`);  // Default is order ASC.
deepSort(myArray, `id`, `asc`);
deepSort(myArray, `id`, `desc`);
deepSort(myArray, `nested.time`, `asc`);
deepSort(myArray, `nested.deeper.text`, `desc`);
```

## Custom Comparator Function
If you need more control you can pass a comparator function to the `deepSort.custom()` method. You must return a numerical value from this function which can be accepted by `Array.sort()`:
* **-1** - Sort itemA lower than itemB. (ASC).
* **0** - Leave in place.
* **+1** - Sort itemA higher than itemB (DESC).

```javascript
// Pull out a specific property by passing in a path.
deepSort.custom(myArray, `nested.deeper.text`, (itemA, itemB, propA, propB) => {

	// itemA -> myArray[0]
	// itemB -> myArray[1]
	// propA -> AAA
	// propB -> BBB

	return an integer;

});

// Or just receive the array if you aren't fussed about a particular property.
deepSort.custom(myArray, null, (itemA, itemB) => {

	// itemA -> myArray[0]
	// itemB -> myArray[1]

	return an integer;

});
```

## API Overview

### deepSort(array, path, order = 'asc')
Sort the given array by the property at the given path, in the order specified.

### deepSort.custom(array, path = null, comparator)
Sort the given array using the result of the comparator function. Specify a path if you wish to expose a specific property to the comparator function, or a falsy value otherwise.
