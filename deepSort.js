'use strict';

/*
 * DEEP SORT
 */

const props = require(`deep-property`);

/*
 * Execute the sorting algorithm.
 */
function executeDeepSort (iterable, keyProperty = null, sortProperty = null, sortDirection = `asc`, comparator = null) {

	const isDictionary = !Array.isArray(iterable);
	const arrayToSort = (isDictionary ? Object.values(iterable) : iterable);
	let sortMethod;

	// Figure out our sorting method.
	if (typeof comparator === `function`) {
		sortMethod = `comparator`;
	}
	else if (typeof sortDirection === `string`) {
		sortMethod = sortDirection.toLowerCase();
	}
	else if (typeof sortDirection === `number`) {
		sortMethod = (sortDirection >= 0 ? `asc` : `desc`);
	}

	// Catch some errors before we start sorting.
	if (!sortMethod || (sortMethod !== `comparator` && !sortProperty)) {
		throw new Error(`Invalid sorting arguments.`);
	}

	if (isDictionary && !keyProperty) {
		throw new Error(`You must specify "keyProperty" when the iterable is an object.`);
	}

	// Execute the sort!
	arrayToSort.sort((itemA, itemB) => {
		let propA;
		let propB;

		if (sortProperty) {
			propA = props.get(itemA, sortProperty);
			propB = props.get(itemB, sortProperty);
		}

		switch (sortMethod) {
			case `comparator`:
				return comparator({ propA, propB, itemA, itemB, iterable, keyProperty, sortProperty, sortDirection });

			case `asc`: return (propA < propB ? -1 : (propA > propB ? +1 : 0));
			case `desc`: return (propA < propB ? +1 : (propA > propB ? -1 : 0));
			default: throw new Error(`Invalid sort method.`);
		}
	});

	// If the iterable is a dictionary, we must convert the array back to a dictionary.
	if (isDictionary) {
		const newDictionary = {};

		arrayToSort.forEach(item => {
			const keyValue = props.get(item, keyProperty);
			newDictionary[keyValue] = item;
		});

		return newDictionary;
	}

	// Otherwise just return the original array.
	return arrayToSort;

}

/*
 * Sort the given iterable (array or dictionary) with all arguments available.
 */
module.exports = function deepSort (iterable, keyProperty, sortProperty, sortDirection, comparator) {
	return executeDeepSort(iterable, keyProperty, sortProperty, sortDirection, comparator);
};

/*
 * Sort the given array using the given object path, ordering flag, and optional comparator.
 */
module.exports = module.exports.array = function deepSort (array, sortProperty, sortDirection, comparator) {
	return executeDeepSort(array, null, sortProperty, sortDirection, comparator);
};

/*
 * Sort the given object using the given key property, object path and custom comparator function.
 */
module.exports.object = function deepSortObject (object, keyProperty, sortProperty, sortDirection, comparator) {
	return executeDeepSort(object, keyProperty, sortProperty, sortDirection, comparator);
};

/*
 * Sort the given iterable using the result of a custom comparator function.
 */
module.exports.custom = function deepSortCustom (iterable, arg2, arg3) {

	let keyProperty = null;
	let comparator = null;

	// Allow parameter switching.
	if (typeof arg2 === `function`) {
		comparator = arg2;
	}
	else {
		keyProperty = arg2;
		comparator = arg3;
	}

	// The comparator is required in this method.
	if (typeof comparator !== `function`) {
		throw new Error(`You must pass a comparator function to "deepSort.custom()".`);
	}

	return executeDeepSort(iterable, keyProperty, null, null, comparator);

};
