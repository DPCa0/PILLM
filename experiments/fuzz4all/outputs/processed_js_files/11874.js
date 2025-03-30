const fetch = require('node-fetch');

(async () => {
  try {
     
    class RandomUser {
      #firstName;
      #lastName;

      constructor(firstName, lastName) {
        this.#firstName = firstName;
        this.#lastName = lastName;
      }

       
      #getFullName() {
        return `${this.#firstName} ${this.#lastName}`;
      }

       
      static async fetchRandomUser() {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        const user = data.results[0];
        return new RandomUser(user.name.first, user.name.last);
      }

       
      *nameGenerator() {
        yield* [this.#firstName, this.#lastName];
      }

       
      greet() {
        print(`Hello, I am ${this.#getFullName()}!`);
      }
    }

     
    const randomUser = await RandomUser.fetchRandomUser();
    randomUser?.greet();

     
    const [firstName, lastName] = [...randomUser.nameGenerator()];
    print(`Generated Name: ${firstName} ${lastName}`);

     
    const promises = [
      Promise.resolve(42),
      Promise.reject('Oops!'),
      Promise.resolve(randomUser),
    ];

    const results = await Promise.allSettled(promises);
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        print('Fulfilled:', result.value);
      } else {
        console.error('Rejected:', result.reason);
      }
    });
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
