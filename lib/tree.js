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
