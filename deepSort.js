'use strict';

/*
 * DEEP SORT
 */

const props = require(`deep-property`);

/*
 * Execute the sorting algorithm.
 */
function executeDeepSort (iterable, path, order = `asc`, comparator = null) {

	const sortMethod = (typeof comparator === `function` ? `comparator` : order.toLowerCase());

	return iterable.sort((itemA, itemB) => {
		let propA;
		let propB;

		if (path) {
			propA = props.get(itemA, path);
			propB = props.get(itemB, path);
		}

		switch (sortMethod) {
			case `comparator`: return comparator(itemA, itemB, propA, propB);

			case `asc`:
			case 1:
				return (propA < propB ? -1 : (propA > propB ? +1 : 0));

			case `desc`:
			case -1:
				return (propA < propB ? +1 : (propA > propB ? -1 : 0));

			default: throw new Error(`Invalid sort method.`);
		}
	});

}

/*
 * Sort the given iterable using the given object path and ordering flag.
 */
module.exports = function deepSort (iterable, path, order) {
	return executeDeepSort(iterable, path, order);
};

/*
 * Sort the given iterable using the given object path and custom comparator function.
 */
module.exports.custom = function deepSortCustom (iterable, path, comparator) {
	return executeDeepSort(iterable, path, null, comparator);
};
