export const handleList = [];

export function run() {
	if (handleList.length) {
		handleList.forEach(item => {
			item.handleAnimation();
		})
	}
}

export function add(item) {
	handleList.push(item);
}

export function remove(item) {
	handleList.splice(handleList.indexOf(item), 1);
}