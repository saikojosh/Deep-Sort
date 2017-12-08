# Deep-Sort
A handy utility function to sort arrays of objects or dictionaries of objects by property (including nested properties).

## Quick Start
Sorting behaviour is the same as `Array.sort()`. See the `/examples` directory for some working examples.

### Sorting an Array of Objects
You can sort an array of objects based on one of its (nested) properties. Arrays are sorted in place (the original array is mutated) and the result is returned.

```javascript
const deepSort = require(`deep-sort`);

const myArray = [
	{ id: 1, nested: { time: 111, deeper: { text: `AAA` } } },
	{ id: 2, nested: { time: 222, deeper: { text: `BBB` } } },
	{ id: 3, nested: { time: 333, deeper: { text: `CCC` } } },
];

// Shorthand.
deepSort.array(myArray, `id`);  // Default is order ASC.
deepSort.array(myArray, `id`, `asc`);
deepSort.array(myArray, `id`, `desc`);
deepSort.array(myArray, `nested.time`, `asc`);
deepSort.array(myArray, `nested.deeper.text`, `desc`);
deepSort.array(myArray, `nested.deeper.text`, `desc`, comparatorFunction);

// Longhand (all arguments required).
deepSort(myArray, null, `id`, `asc`);
deepSort(myArray, null, `id`, `asc`, comparatorFunction);
```

### Sorting a Dictionary of Objects
You can sort a dictionary of objects based on one of its (nested) properties. Dictionaries are not mutated, and a new dictionary will be returned.

```javascript
const deepSort = require(`deep-sort`);

const myDictionary = {
	'key_1nd': { key: `key_1nd`, quantity: 98, nested: { time: 111, deeper: { text: `AAA` } } },
	'key_k8a': { key: `key_k8a`, quantity: 45, nested: { time: 222, deeper: { text: `BBB` } } },
	'key_aj3': { key: `key_aj3`, quantity: 1, nested: { time: 333, deeper: { text: `CCC` } } },
};

// Shorthand.
deepSort.object(myDictionary, `key`, `quantity`);  // Default is order ASC.
deepSort.object(myDictionary, `key`, `quantity`, `asc`);
deepSort.object(myDictionary, `key`, `quantity`, `desc`);
deepSort.object(myDictionary, `key`, `nested.time`, `asc`);
deepSort.object(myDictionary, `key`, `nested.deeper.text`, `desc`);
deepSort.object(myDictionary, `key`, `nested.deeper.text`, `desc`, comparatorFunction);

// Longhand (all arguments required).
deepSort(myDictionary, `key`, `quantity`, `quantity`, `asc`);
deepSort(myDictionary, `key`, `quantity`, `quantity`, `asc`, comparatorFunction);
```

## Custom Comparator Function
If you need more control you can pass a comparator function to the `deepSort.custom()` method. You must return a numerical value from this function which can be accepted by `Array.sort()`:
* **-1** - Sort itemA lower than itemB. (ASC).
* **0** - Leave in place.
* **+1** - Sort itemA higher than itemB (DESC).

```javascript
// Arrays.
deepSort.custom(array, resources => {

	// resources.itemA    -> the next item in the iterable.
	// resources.itemB    -> the next + 1 item in the iterable.
	// resources.iterable -> the input iterable (array or dictionary).

	return an integer;

});

// Objects.
deepSort.custom(array, `someKeyProperty`, resources => {

	// resources.itemA    -> the next item in the iterable.
	// resources.itemB    -> the next + 1 item in the iterable.
	// resources.iterable -> the input iterable (array or dictionary).

	return an integer;

});
```
If you pass a comparator function to `deepSort()`, `deepSort.array()` or `deepSort.object()` you get access to all the input arguments:

```javascript
function comparator (resources) {

	// resources.propA         -> the next item property in the iterable (specified by sortProperty).
	// resources.propB         -> the next + 1 item property in the iterable (specified by sortProperty).
	// resources.itemA         -> the next item in the iterable.
	// resources.itemB         -> the next + 1 item in the iterable.
	// resources.iterable      -> the input iterable (array or dictionary).
	// resources.keyProperty   -> the input keyProperty (array or dictionary).
	// resources.sortProperty  -> the input sortProperty (array or dictionary).
	// resources.sortDirection -> the input sortDirection (array or dictionary).

	return an integer;

}
```

## API Overview

### deepSort(iterable, keyProperty, sortProperty, sortDirection = 'asc', comparator = null)
Sort the given iterable (array or dictionary) with all arguments available.

### deepSort.array(array, sortProperty, sortDirection = 'asc', comparator = null)
Sort the given array using the given object path, ordering flag, and optional comparator.

The _optional_ comparator function will be passed the following values (e.g. `comparator (resources) { ... }`):

* resources.propA
* resources.propB
* resources.itemA					
* resources.itemB
* resources.iterable
* resources.keyProperty
* resources.sortProperty
* resources.sortDirection

### deepSort.object(object, keyProperty, sortProperty, sortDirection = 'asc', comparator = null)
Sort the given object using the given key property, object path and custom comparator function.

The _optional_ comparator function will be passed the following values (e.g. `comparator (resources) { ... }`):

* resources.propA
* resources.propB
* resources.itemA					
* resources.itemB
* resources.iterable
* resources.keyProperty
* resources.sortProperty
* resources.sortDirection

### deepSort.custom(iterable, comparator)
Sort the given iterable using the result of a custom comparator function.

The _required_ comparator function will be passed the following values (e.g. `comparator (resources) { ... }`):

* resources.itemA					
* resources.itemB
* resources.iterable
