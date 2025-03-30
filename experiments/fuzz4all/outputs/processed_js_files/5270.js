class User {
  #privateField = 'hidden';

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  *nameGenerator() {
    yield* this.name.split(' ');
  }

  get privateField() {
    return this.#privateField;
  }
}

const fetchUserData = async (id) => {
  const response = await fetch(`https: 
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
};

(async () => {
  try {
    const userData = await fetchUserData(1);
    const user = new User(userData.name, userData.age);

    const nameParts = [...user.nameGenerator()];
    print('Name Parts:', nameParts);

    const proxyUser = new Proxy(user, {
      get(target, prop) {
        if (prop === 'privateField') return 'Access Denied';
        return target[prop];
      },
    });

    print('User Name:', proxyUser.name);
    print('Private Field Access:', proxyUser.privateField);
  } catch (error) {
    console.error(error);
  }
})();
