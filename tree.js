// Node for a general tree
class TreeNode {
	constructor(val, children = []) {
		this.val = val;
		this.children = children;
	}
}

class Tree {
	constructor(root = null) {
		this.root = root;
	}

	//sumValues(): Given an n-ary tree of integers, add up all values in the tree
	sumValues() {
		if (this.root === null) return 0;
	
		let total = this.root.val;

		function traverse(current){
			for (let child of current.children) {
				console.log(child.val)
				total += child.val;
				if (child.children.length) {
					traverse(child);
				}
			}
		}

		traverse(this.root);
		return total;
		
	}

	//countEvens(): Given an n-ary tree of integers, count all nodes in tree with even values
	countEvens() {
		if (this.root === null) return 0;
	
		let total = this.root.val % 2 === 0 ? 1 : 0;

		function traverseInCountEvens(current) {
			for (let child of current.children) {
				console.log(child.val);
				if (child.val % 2 === 0) {
					total++;
				}
				if (child.children.length) {
					traverseInCountEvens(child);
				}
			}
		}

		traverseInCountEvens(this.root);
		return total;
	}

	//numGreater(lowerBound): return count of number of nodes whose value is greater than lowerBound
	numGreater(lowerBound) {
		if (this.root === null) return 0;
	
		let count = this.root.val > lowerBound ? 1 : 0;

		function traverseInNumGreater(current) {
			for(let child of current.children) {
				console.log(child.val);
				if (child.val > lowerBound) count++;
				if (child.children.length) traverseInNumGreater(child);
			}
		}

		traverseInNumGreater(this.root);
		return count;
	}

}

	// let myNums = new Tree(new TreeNode(10, [
	// new TreeNode(8, [
	// 	new TreeNode(4), new TreeNode(3)
	// ]), 
	// new TreeNode(7, [
	// 	new TreeNode(5, [new TreeNode(0), new TreeNode(1), new TreeNode(2)
	// 	])
	// ])
	// ]));

	// module.exports = { Tree, TreeNode };

	// ***function count(n=1) {  if (n > 3) return
	//   console.log(n);  count(n + 1);}
	// So a prints hello, calls b which prints world, calls c which prints i and returns back to b which then prints love which then returns back to a which prints coding.
	// Loops & Recursion: any loop can be written instead with recursion, and vice versa
	// data = [ 1, [2, [3], 4], 5 ]
	// function doubler(nums) {
	//   for (let n of nums) {
	//     if Array.isArray(n) {
	//       doubler(n);
	//     } else {
	//       console.log(n * 2);    }  }}
	// Recursion examples -- filesystem paths, fractals, parsing, nested data
	// Keep track of position in array, rather than slice:
	// function sum(nums, i=0) {  if (i === nums.length) return 0;
	//   return nums[i] + sum(nums, i + 1);}
	// Given array of nums, return even numbers:
	// function evens(nums, i=0) {  if (nums.length === i) return [];
	//   if (nums[i] % 2 === 0) {    return [nums[i], ...evens(nums, i +1)];  }
	//   return evens(nums, i + 1);}
