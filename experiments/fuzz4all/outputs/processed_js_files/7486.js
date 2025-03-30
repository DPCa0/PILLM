 
class User {
  #password;
  
  constructor(username, password) {
    this.username = username;
    this.#password = password;
  }
  
  static fromJson(json) {
    const { username, password } = JSON.parse(json);
    return new User(username, password);
  }
  
   
  *getUserDetails() {
    yield `Username: ${this.username}`;
    yield `Password: ${this.#password}`;
  }
}

 
const handler = {
  get: (target, property) => {
    if (property === 'password') {
      return '*****';
    }
    return Reflect.get(target, property);
  },
};

 
const userJson = JSON.stringify({ username: "JohnDoe", password: "12345" });
const user = new User.fromJson(userJson);
const proxyUser = new Proxy(user, handler);

 
async function displayUserDetails(user) {
  const details = [];
  for (let detail of user.getUserDetails()) {
    details.push(detail);
  }
  await new Promise(res => setTimeout(res, 1000));   
  print(details.join('\n'));
}

 
print(Reflect.get(proxyUser, 'username'));   
print(Reflect.get(proxyUser, 'password'));   

displayUserDetails(proxyUser);
