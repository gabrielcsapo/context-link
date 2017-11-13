const Tree = require('./lib/tree');

class Context {
	/**
   * Find contextual relevant searches between array entries
   * @class Context
   * @param  {Array.string}    array - array of strings to find contextual relevant searches
   * @example
var ContextLink = require('context-link');
var context = new ContextLink([
  'hello world',
  'hello saturn',
  'hello pluto'
]);
   *
   */
	constructor(array) {
		this.trees = [];

		array.forEach((a) => {
			var s = a.split(' ');
			var tree = new Tree(s[0]);

			for(var i = 1; i < s.length; i++) {
				tree.add(s[i], s[i - 1]);
			}

			this.trees.push(tree);
		});
	}
	/**
   * find all values or a given value in the paragraphs
   * @method find
   * @memberof Context
   * @param  {String=} word - a word to search for, if not passed, find all words
   * @return {Object.<string, array.<object>>} - the response is an hash map of arrays that contains objects
   * @example
var result = context.find('hello');
/* result is
 {
  hello:
   [ { entry: [Object], index: 1 },
     { entry: [Object], index: 1 },
     { entry: [Object], index: 3 },
     { entry: [Object], index: 5 } ] }
 }
/*
   */
	find(word) {
		var found = {};
		
		if(!word) {
			this.trees.forEach((tree, o) => {
				tree.traverse((n) => {
					var data = n.data;

					this.trees.forEach((tree, i) => {
						if(o == i) return; // do not search the same tree
						var index = 0;
						tree.contains((d) => {
							if(d.data === data) {
								if(!found[data]) {
									found[data] = [{
										entry: o,
										index: i,
										position: index
									}];
								} else {
									found[data].push({
										entry: o,
										index: i,
										position: index
									});
								}
							}
							index += 1;
						});
					});
				});
			});

			return found;
		} else {
			this.trees.forEach((tree, i) => {
				var index = 0;
				tree.contains((d) => {
					if(word === d.data) {
						if(!found[d.data]) {
							found[d.data] = [{
								entry: d,
								index: i,
								position: index
							}];
						} else {
							found[d.data].push({
								entry: d,
								index: i,
								position: index
							});
						}
					}
					index += 1;
				});
			});

			return found;
		}
	}
}

module.exports = Context;
