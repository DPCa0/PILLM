class AsyncMath {
  static async add(x, y) {
    return new Promise((resolve) => setTimeout(() => resolve(x + y), 100));
  }

  static async subtract(x, y) {
    return new Promise((resolve) => setTimeout(() => resolve(x - y), 100));
  }
}

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

(async () => {
  try {
     
    const result1 = await AsyncMath.add(5, 10);
    const result2 = await AsyncMath.subtract(20, 8);

    print(`Result of async add: ${result1}`);
    print(`Result of async subtract: ${result2}`);

     
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print(`Fetched post title: ${data.title}`);

     
    const user = { name: 'Alice', age: 25 };
    const updatedUser = { ...user, age: 26, city: 'Wonderland' };
    print('Updated User:', updatedUser);

     
    const uniqueNumbers = new Set([1, 2, 3, 3, 4, 5]);
    print('Unique Numbers:', Array.from(uniqueNumbers));

     
    const settings = { theme: { darkMode: true } };
    print('Dark Mode:', settings.theme?.darkMode);
    print('Light Mode:', settings.theme?.lightMode ?? 'Default');
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();
