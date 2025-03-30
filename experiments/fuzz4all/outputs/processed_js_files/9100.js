 
async function* fetchGitHubUsers(usernames) {
  for (const username of usernames) {
    const response = await fetch(`https: 
    if (response.ok) {
      const data = await response.json();
      yield { username, data };
    } else {
      yield { username, error: `Error fetching data for ${username}` };
    }
  }
}

 
async function processGitHubUsers(usernames) {
  const userGen = fetchGitHubUsers(usernames);
  for await (const user of userGen) {
    if (user.error) {
      console.error(user.error);
    } else {
      const { username, data } = user;
      print(`User: ${username}, Followers: ${data.followers}`);
    }
  }
}

 
const usernames = ['octocat', 'torvalds', 'nonexistentuser12345'];

 
const handler = {
  get(target, prop) {
    if (typeof target[prop] === 'function') {
      return target[prop].bind(target);
    }
    if (prop in target) {
      print(`Accessing property '${prop}': ${target[prop]}`);
      return target[prop];
    }
    throw new Error(`Property '${prop}' does not exist`);
  },
  set(target, prop, value) {
    if (typeof value === 'string' && /^[a-zA-Z0-9]+$/.test(value)) {
      target[prop] = value;
      return true;
    }
    throw new Error(`Invalid value for '${prop}'. Must be alphanumeric string.`);
  }
};

const validatedUsernames = new Proxy(usernames, handler);

 
validatedUsernames[3] = 'newuser';  
try {
  validatedUsernames[4] = 'invalid user!';  
} catch (e) {
  console.error(e.message);
}

 
processGitHubUsers(validatedUsernames);
