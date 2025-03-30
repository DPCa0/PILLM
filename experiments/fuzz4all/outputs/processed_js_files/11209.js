class User {
  #privateData = 'This is private';

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  static fromJSON(json) {
    const data = JSON.parse(json);
    return new User(data.name, data.age);
  }

  getPrivateData() {
    return this.#privateData;
  }

  async fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
}

const processData = async () => {
  try {
    const user = User.fromJSON('{"name": "Alice", "age": 30}');
    print(`User created: ${user.name}, ${user.age}`);

    const data = await user.fetchData('https://jsonplaceholder.typicode.com/todos/1');
    print('Fetched Data:', data);

    const numbers = [1, 2, 3, 4, 5];
    const squared = numbers.map(n => n ** 2);
    print('Squared Numbers:', squared);

    const newArray = [...numbers, ...squared];
    print('Combined Array:', newArray);
    
    print('Private Data:', user.getPrivateData());

  } catch (error) {
    console.error('Error:', error);
  }
};

processData();
