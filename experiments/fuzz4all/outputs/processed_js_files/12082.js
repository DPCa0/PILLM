 

class UserFetcher {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async fetchUsers(ids) {
    const userPromises = ids.map(id => this.fetchUser(id));
    const users = await Promise.all(userPromises);
    return users.filter(user => user !== null);
  }

  async fetchUser(id) {
    try {
      const response = await fetch(`${this.apiUrl}/users/${id}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error(`Failed to fetch user ${id}:`, error);
      return null;
    }
  }
}

const mergeUserLists = (users1, users2) => {
  const mergedMap = new Map();

  [...users1, ...users2].forEach(user => {
    if (!mergedMap.has(user.id)) {
      mergedMap.set(user.id, user);
    }
  });

  return Array.from(mergedMap.values());
};

const displayUsers = (users) => {
  users.forEach(user => {
    print(`User: ${user.name}, Email: ${user.email}`);
  });
};

(async () => {
  const api = 'https://jsonplaceholder.typicode.com';
  const userFetcher = new UserFetcher(api);

  const ids1 = [1, 2, 3, 4];
  const ids2 = [3, 4, 5, 6];

  const [users1, users2] = await Promise.all([
    userFetcher.fetchUsers(ids1),
    userFetcher.fetchUsers(ids2)
  ]);

  const mergedUsers = mergeUserLists(users1, users2);
  displayUsers(mergedUsers);
})();
