export const loadUsers = async () => {
    const myUsers = [];
	try {
		const response = await fetch(
			'https://jsonplaceholder.typicode.com/users',
		);
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		const myData = await response.json();
		for (const data of myData) {
			myUsers.push(data);
		}
        return myUsers;
	} catch (err) {
		console.error(err);
	}
};
