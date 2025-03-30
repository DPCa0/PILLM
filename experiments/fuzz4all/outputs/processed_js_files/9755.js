class User {
  #password;  

  constructor(username, password) {
    this.username = username;
    this.#password = password;
  }

   
  static fromJSON(json) {
    const { username, password } = JSON.parse(json);
    return new User(username, password);
  }

   
  async validatePassword(inputPassword) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (inputPassword === this.#password) {
          resolve(true);
        } else {
          reject(new Error('Invalid password'));
        }
      }, 1000);
    });
  }

   
  login = async (password) => {
    try {
      const isValid = await this.validatePassword(password);
      print(isValid ? 'Login successful' : 'Login failed');
    } catch (err) {
      console.error(err.message);
    }
  };
}

const userJSON = JSON.stringify({ username: 'jsmith', password: 'secret' });
const user = User.fromJSON(userJSON);

user.login('secret');  
user.login('wrongPassword');  
