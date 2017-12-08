'use strict';

/*
 * EXAMPLE: Array.
 */

/* eslint no-console: 0 */
/* eslint id-length: 0 */
/* eslint no-unused-vars: 0 */

const util = require(`util`);
const deepSort = require(`../deepSort`);

const output = (array) => {
	array.forEach(
		item => console.log(util.inspect(item, { depth: null, colors: true, breakLength: Infinity }))
	);
};

const myArray = [
	{ id: 1, nested: { time: 111, deeper: { text: `AAA` } } },
	{ id: 2, nested: { time: 222, deeper: { text: `BBB` } } },
	{ id: 3, nested: { time: 333, deeper: { text: `CCC` } } },
];

console.log(`\nid@asc ->`);
output(deepSort(myArray, `id`, `asc`));

console.log(`\nid@desc ->`);
output(deepSort(myArray, `id`, `desc`));

console.log(`\nnested.deeper.text@asc ->`);
output(deepSort(myArray, `nested.deeper.text`, `asc`));

console.log(`\nnested.deeper.text@desc ->`);
output(deepSort(myArray, `nested.deeper.text`, `desc`));

console.log(`\nnested.time@desc ->`);
output(
	deepSort.custom(myArray, ({ itemA, itemB }) => itemB.nested.time - itemA.nested.time)
);
