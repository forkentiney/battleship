const createLinkedList = () => {
	let head = null;
	let tail = null;
	let size = 0;
	
	const append = (value) => {
		const newNode = createNode(value);
		if (!head) {
			head = newNode;
		} else {
			let current = head;
			while (current.next) {
				current = current.next;
			}
			current.next = newNode;
			tail = newNode;
		}
		size++;
	};

	const prepend = (value) => {
		const newNode = createNode(value);
		if (!head) {
			head = newNode;
		} else {
			newNode.next = head;
			head = newNode;
		};
		size++;
	};
	
	const at = (value) => {
		if (value > size) return undefined;
		let current = head;
		for (i = 0; i < value; i++) {
			current = current.next;
		};
		if (current === null) return undefined;
		return current;
	};

	const pop = () => {
		const oldHead = head;
		head = head.next;
		return `The value ${oldHead.value} has been removed. The new head is ${head.value}.`;
	};

	const contains = (value) => {
		let current = head;
		while (current && current.value !== value) {
			current = current.next;
		};
		if (current === null) {
			return false;
		} else {
			return true;
		};
	};

	const findIndex = (value) => {
		let current = head;
		let index = 0;
		while (current && current.value !== value) {
			current = current.next;
			index++;
		};
		if (current === null) {
			return -1;
		} else {
			return index;
		};
	};

	const toString = () => {
		let string = ``;
		let current = head;
		for (i = 0; i < size; i++) {
			string += `( ${current.value} ) -> `;
			current = current.next;
		};
		string += `null`;
		return string;
	};

	const displayHead = () => head;
	const displayTail = () => tail;
	const displaySize = () => size;

	return { append, prepend, displayHead, displayTail, at, pop, contains, findIndex, toString, displaySize };
};

const createNode = (value = null, next = null) => {
	return { value, next };
};

export { createLinkedList };
