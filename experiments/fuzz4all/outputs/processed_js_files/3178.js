 

 
const fetchUserData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results.map(({ name: { first, last }, email }) => ({
      fullName: `${first} ${last}`,
      email,
    }));
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return [];
  }
};

 
const calculateAge = async (birthYear) => {
  const { getCurrentYear } = await import("./dateUtils.js");
  return getCurrentYear() - birthYear;
};

 
const createObservableObject = (obj) => {
  return new Proxy(obj, {
    set(target, property, value) {
      print(`Property ${property} changed to ${value}`);
      target[property] = value;
      return true;
    },
  });
};

 
const memoize = (fn) => {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

 
(async () => {
  const userUrl = "https://randomuser.me/api/?results=5";
  const users = await fetchUserData(userUrl);
  console.table(users);

  const ageCalculator = memoize(calculateAge);
  const age = await ageCalculator(1990);
  print("Calculated Age:", age);

  const person = createObservableObject({ name: "Alice", age: 25 });
  person.age = 26;  
})();
