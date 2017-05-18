'use strict';

/*
 * DEEP SORT
 */

const props = require(`deep-property`);

/*
 * Execute the sorting.
 */
function executeDeepSort (array, path, order = `asc`, comparator = null) {

	const sortMethod = (typeof comparator === `function` ? `comparator` : order.toLowerCase());

	return array.sort((itemA, itemB) => {
		const propA = props.get(itemA, path);
		const propB = props.get(itemB, path);

		switch (sortMethod) {
			case `comparator`: return comparator(propA, propB, itemA, itemB);

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
 * Sort the given array using the given object path and ordering flag.
 */
module.exports = function deepSort (array, path, order) {
	return executeDeepSort(array, path, order);
};

/*
 *
 */
module.exports.custom = function deepSortCustom (array, path, comparator) {
	return executeDeepSort(array, path, null, comparator);
};
