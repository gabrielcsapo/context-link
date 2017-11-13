require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Node(data) {
	this.data = data;
	this.parent = null;
	this.children = [];
}

class Tree {
	constructor(data) {
		var node = new Node(data);
		this._root = node;
	}
	traverse(callback) {
		var queue = [];

		queue.push(this._root);

		var currentTree = queue.shift();

		while(currentTree){
			for (var i = 0, length = currentTree.children.length; i < length; i++) {
				queue.push(currentTree.children[i]);
			}

			callback(currentTree);
			currentTree = queue.shift();
		}
	}
	contains(callback) {
		this.traverse.call(this, callback);
	}
	add(data, toData) {
		var tree = this;
		var child = new Node(data);
		var parent = null;
		var callback = function(node) {
			if(node.data === toData) {
				parent = node;
			}
		};
		tree.contains(callback, this.traverse);

		if(parent) {
			parent.children.push(child);
			child.parent = parent;
		} else {
			throw new Error('Cannot add node to a non-existent parent.');
		}
	}
	findIndex(arr, data) {
		var index;

		for(var i = 0; i < arr.length; i++) {
			if(arr[i].data == data) {
				index = 1;
			}
		}

		return index;
	}
	remove(data, fromData) {
		var tree = this;
		var parent = null;
		var childToRemove = null;
		var index = null;

		var callback = function(node) {
			if(node.data === fromData) {
				parent = node;
			}
		};

		tree.contains(callback);

		if(parent) {
			index = tree.findIndex(parent.children, data);

			if(index == undefined) {
				throw new Error('Node to remove does not exist.');
			} else {
				childToRemove = parent.children.splice(index, 1);
			}
		} else {
			throw new Error('Parent does not exist');
		}

		return childToRemove;
	}
}

module.exports = Tree;

},{}],"context-link":[function(require,module,exports){
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

},{"./lib/tree":1}]},{},[]);
