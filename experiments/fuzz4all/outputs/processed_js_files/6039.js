class User {
  #privateData;  
  static #userCount = 0;  

  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.#privateData = { hobbies: [] };
    User.#userCount++;
  }

   
  static getUserCount() {
    return User.#userCount;
  }

   
  get privateData() {
    return this.#privateData;
  }

  set privateData(data) {
    if (Array.isArray(data.hobbies)) {
      this.#privateData.hobbies = data.hobbies;
    } else {
      throw new Error('Hobbies must be an array');
    }
  }

  addHobby(hobby) {
    this.#privateData.hobbies.push(hobby);
  }

   
  async fetchHobbySuggestions() {
    try {
      const response = await fetch('https://api.example.com/hobbies');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      this.privateData = { hobbies: data.suggestions };
    } catch (error) {
      console.error('Fetching hobbies failed: ', error);
    }
  }

   
  static createProxy(user) {
    return new Proxy(user, {
      get(target, property) {
        if (property in target) {
          print(`Accessing property: ${property}`);
          return target[property];
        }
        return undefined;
      },
      set(target, property, value) {
        print(`Setting property: ${property} to ${value}`);
        target[property] = value;
        return true;
      }
    });
  }
}

 
const user1 = new User('Alice', 30);
user1.addHobby('Reading');
print('User count:', User.getUserCount());

const proxyUser = User.createProxy(user1);
print(proxyUser.name);
proxyUser.age = 31;

(async () => {
  await user1.fetchHobbySuggestions();
  print(user1.privateData);
})();
