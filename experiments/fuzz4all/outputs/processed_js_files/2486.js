 
(async () => {
  try {
     
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();

     
    const {
      name: { first, last },
      location: { city, country },
      dob: { age },
    } = data.results[0];

     
    class User {
      constructor(firstName, lastName, city, country, age) {
        Object.assign(this, { firstName, lastName, city, country, age });
      }

       
      static createUserFromData(data) {
        return new User(data.first, data.last, data.city, data.country, data.age);
      }

       
      getInfo() {
        return `${this.firstName} ${this.lastName}, Age: ${this.age}, Location: ${this.city}, ${this.country}`;
      }
    }

     
    const user = new Proxy(User.createUserFromData({ first, last, city, country, age }), {
      get(target, property) {
        print(`Accessing property "${property}"`);
        return target[property];
      }
    });

     
    print(user.getInfo());

  } catch (error) {
    console.error('Error fetching user data:', error);
  }
})();
