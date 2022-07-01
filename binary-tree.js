// Node for a binary tree
class BinaryTreeNode {
	constructor(val, left = null, right = null) {
		this.val = val;
		this.left = left;
		this.right = right;
	}
}

class BinaryTree {
	constructor(root = null) {
		this.root = root;
	}

	// minDepth(): Given a binary tree, find min depth. Number of nodes of shortest path from root node down to nearest leaf node.
	minDepth() {
		if (this.root === null) return 0;

		function traverse (currNode) {
			if (!currNode.left && !currNode.right) return 1;
			if (!currNode.left && currNode.right) {
				return traverse(currNode.right) + 1;
			}
			if (currNode.left && !currNode.right) {
				return traverse(currNode.left) + 1;
			}

			return (Math.min(traverse(currNode.left), traverse(currNode.right)) + 1);
		}

		return traverse(this.root);		
	}

	// maxDepth(): Given a binary tree, find max depth. Number of nodes of longest path from root node down to furthest leaf node.
	maxDepth() {
		if (this.root === null) return 0;

		function traverse (currNode) {
			if (!currNode.left && !currNode.right) return 1;
			if (!currNode.left && currNode.right) {
				return traverse(currNode.right) + 1;
			}
			if (currNode.left && !currNode.right) {
				return traverse(currNode.left) + 1;
			}

			return (Math.max(traverse(currNode.left), traverse(currNode.right)) + 1);
		}

		return traverse(this.root);		
	}

	// maxSum(): Return max sum obtained by traveling along a path in the tree. Path doesn't need to start at the root, but can't visit a node more than once.
	maxSum() {
		if (this.root === null) return 0;
		let sum = 0;

		function sumTree(currNode) {
			if (!currNode) return 0;
			const leftSum = sumTree(currNode.left);
			const rightSum = sumTree(currNode.right);
			sum = Math.max(sum, leftSum + rightSum + currNode.val);
			return Math.max(leftSum + currNode.val, rightSum + currNode.val);
		}

		sumTree(this.root);
		return sum;

	}

	// nextLarger(lowerBound): return smallest value in tree which is larger than lowerBound. Return null if no such value exists.
	nextLarger(lowerBound) {
		if (this.root === null) return null;
		let minLarger = Infinity;

		function traverse (curr) {
			if(!curr) return null;
			if ((curr.val > lowerBound) && (curr.val < minLarger)) {
				minLarger = curr.val;
			}
			if(curr.left) traverse(curr.left);
			if(curr.right) traverse(curr.right);

			return minLarger;
		}
	
		traverse(this.root)
		return minLarger === Infinity ? null : minLarger;
	}

	// areCousins(node1, node2): Determine if 2 nodes are cousins (same level, different parents)
	areCousins(node1, node2) {
		if (node1 === this.root || node2 === this.root) return false;
	
		function findLevelAndParent(
		  nodeToFind,
		  currentNode,
		  level = 0,
		  data = { level: 0, parent: null }
		) {
		  if (data.parent) return data;
		  if (currentNode.left === nodeToFind || currentNode.right === nodeToFind) {
			data.level = level + 1;
			data.parent = currentNode;
		  }
		  if (currentNode.left) {
			findLevelAndParent(nodeToFind, currentNode.left, level + 1, data);
		  }
		  if (currentNode.right) {
			findLevelAndParent(nodeToFind, currentNode.right, level + 1, data);
		  }
		  return data;
		}
	
		let node1Info = findLevelAndParent(node1, this.root);
		let node2Info = findLevelAndParent(node2, this.root);
	
		let sameLevel =
		  node1Info && node2Info && node1Info.level === node2Info.level;
		let differentParents =
		  node1Info && node2Info && node1Info.parent !== node2Info.parent;
		return sameLevel && differentParents;
	  }

	// serialize(tree): serialize the BinaryTree object tree into a string.
	// Output looks like: 1 2 # # 3 4 # # 5 # # where # represents # children with a pre-order traversal.
	static serialize(tree) {
		const values = [];

    	function traverse(node) {
      		if (node) {
        		values.push(node.val);
        		traverse(node.left);
        		traverse(node.right);
      		} else {
        		values.push("#");
      		}
    	}

    	traverse(tree.root);
    	return values.join(" ");

		// BinaryTree.serialize(largeTree)
		// '6 5 # # 5 3 2 # # 1 # # 1 # #'

	}

	//deserialize(stringTree): deserialize stringTree into a BinaryTree object
	static deserialize(stringTree) {
		if (!stringTree) return null;
	
		const values = stringTree.split(" ");
	
		function buildTree() {
		  // building a tree starting from the beginning of the array
		  if (values.length) {
			const currentVal = values.shift();
	
			if (currentVal === "#") return null;
	
			// remember to convert values back into numbers
			let currentNode = new BinaryTreeNode(+currentVal);
			currentNode.left = buildTree();
			currentNode.right = buildTree();
	
			return currentNode;
		  }
		}
	
		const root = buildTree();
		return new BinaryTree(root);
	  }

	// lowestCommonAncestor(node1, node2): find lowest common ancestor of two nodes in a binary tree.
	lowestCommonAncestor(node1, node2, currentNode=this.root) {
		// base case 1: empty tree
		if (currentNode === null) return null;
	
		// base case 2: root is one of the target nodes
		if (currentNode === node1 || currentNode === node2) return currentNode;
	
		// recursively search the left sub-tree
		const left = this.lowestCommonAncestor(node1, node2, currentNode.left);
	
		// recursively search the right sub-tree
		const right = this.lowestCommonAncestor(node1, node2, currentNode.right);
	
		// if neither left nor right is null, currentNode is the ancestor
		if (left !== null && right !== null) return currentNode;
		
		// if one node is not null, return it
		if (left !== null || right !== null) return left || right;
		
		// left and right are both null, return null
		if (left === null && right === null) return null;
	  }
}

// module.exports = { BinaryTree, BinaryTreeNode };
