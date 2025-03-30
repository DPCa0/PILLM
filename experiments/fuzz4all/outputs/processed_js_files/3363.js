 
const AppModule = (() => {
   
  const users = new Map();

   
  class User {
    #id;
    #name;
    #email;

    constructor(id, name, email) {
      this.#id = id;
      this.#name = name;
      this.#email = email;
    }

    getInfo() {
      return {
        id: this.#id,
        name: this.#name,
        email: this.#email,
      };
    }

     
    #validateEmail() {
      return /^\S+@\S+\.\S+$/.test(this.#email);
    }

    isValid() {
      return this.#validateEmail();
    }
  }

   
  async function* fetchUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    for (const item of data) {
      yield new User(item.id, item.name, item.email);
    }
  }

   
  const addUser = async (user) => {
    if (user.isValid()) {
      users.set(user.getInfo().id, user);
    }
  };

   
  const processUsers = async () => {
    for await (const user of fetchUsers()) {
      await addUser(user);
    }
    users.forEach(user => {
      print(user.getInfo());
    });
  };

  return {
    run: processUsers,
  };
})();

 
AppModule.run();
