'use strict';

/*
 * EXAMPLE: Object.
 */

/* eslint no-console: 0 */
/* eslint id-length: 0 */
/* eslint no-unused-vars: 0 */

const util = require(`util`);
const deepSort = require(`../deepSort`);

const output = (object) => {
	Object.entries(object).forEach(
		([ key, item ]) => {
			process.stdout.write(`${key}: `);
			process.stdout.write(util.inspect(item, { depth: null, colors: true, breakLength: Infinity }));
			process.stdout.write(`\n`);
		}
	);
};

const myDictionary = {
	'key_1nd': { key: `key_1nd`, quantity: 98, nested: { time: 111, deeper: { text: `AAA` } } },
	'key_k8a': { key: `key_k8a`, quantity: 45, nested: { time: 222, deeper: { text: `BBB` } } },
	'key_aj3': { key: `key_aj3`, quantity: 1, nested: { time: 333, deeper: { text: `CCC` } } },
};

console.log(`\nquantity@asc ->`);
output(deepSort.object(myDictionary, `key`, `quantity`, `asc`));

console.log(`\nquantity@desc ->`);
output(deepSort.object(myDictionary, `key`, `quantity`, `desc`));

console.log(`\nnested.deeper.text@asc ->`);
output(deepSort.object(myDictionary, `key`, `nested.deeper.text`, `asc`));

console.log(`\nnested.deeper.text@desc ->`);
output(deepSort.object(myDictionary, `key`, `nested.deeper.text`, `desc`));

console.log(`\nnested.time@desc ->`);
output(
	deepSort.custom(myDictionary, `key`, ({ itemA, itemB }) => itemB.nested.time - itemA.nested.time)
);
