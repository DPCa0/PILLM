 

 
async function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://api.example.com/user') {
        resolve({
          name: 'John Doe',
          age: 30,
          address: { city: 'New York', zip: '10001' },
        });
      } else {
        reject('Invalid URL');
      }
    }, 1000);
  });
}

 
class User {
  constructor({ name, age, address: { city, zip } }) {
    this.name = name;
    this.age = age;
    this.city = city;
    this.zip = zip;
  }
  info() {
    return `Name: ${this.name}, Age: ${this.age}, Location: ${this.city}, ${this.zip}`;
  }
}

 
(async function main() {
  try {
    const userData = await fetchData('https://api.example.com/user');
    const user = new User(userData);
    print(user.info());
  } catch (error) {
    console.error('Error:', error);
  }
})();
