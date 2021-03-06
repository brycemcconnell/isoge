export const handleList = [];

export function run() {
	if (handleList.length) {
		handleList.forEach(item => {
			item.handleUpdate();
		})
	}
}

export function add(item) {
	handleList.push(item);
}

export function remove(item) {
	handleList.splice(handleList.indexOf(item), 1);
}

export function isPresent(item) {
	if (handleList.includes(item)) {
		return true;
	}
	return false;
}