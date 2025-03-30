 

 
const handler = {
  set(target, property, value) {
    if (property === 'age' && (typeof value !== 'number' || value <= 0)) {
      throw new TypeError('Age must be a positive number');
    }
    target[property] = value;
    return true;
  }
};

const person = new Proxy({}, handler);

 
function* generateTasks() {
  yield new Promise((resolve) => setTimeout(() => resolve('Task 1 completed'), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve('Task 2 completed'), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve('Task 3 completed'), 1000));
}

async function runTasks() {
  const tasks = generateTasks();
  for await (const task of tasks) {
    print(await task);
  }
}

(async () => {
   
  try {
    person.age = 25;
    print(`Person's age set to: ${person.age}`);
    person.age = -5;  // This will throw an error
  } catch (e) {
    console.error(e.message);
  }

  // Demonstrate async task running with generators
  await runTasks();
})();

// Using Map and WeakSet for efficient data management
const userMap = new Map();
const activeUsers = new WeakSet();

class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

const user1 = new User(1, 'Alice');
const user2 = new User(2, 'Bob');

userMap.set(user1.id, user1);
userMap.set(user2.id, user2);

activeUsers.add(user1);

// Using destructuring and rest/spread syntax
function updateUser({ id, name, ...otherInfo }) {
  if (userMap.has(id)) {
    const user = userMap.get(id);
    Object.assign(user, { name, ...otherInfo });
    print(`Updated User: ${JSON.stringify(user)}`);
  }
}

updateUser({ id: 1, name: 'Alice Cooper', role: 'Admin' });

print('All Users:', [...userMap.values()]);
