 

 
const fetchData = async () => {
   
  const [name, age, ...likes] = await Promise.resolve(["Alice", 25, "coding", "music", "coffee"]);
  print(`Name: ${name}, Age: ${age}, Likes: ${likes.join(", ")}`);
  return { name, age, likes };
};

 
const processLikes = (data) => {
  const likeSet = new Set(data.likes);
  const likeMap = new Map();

   
  for (let like of likeSet) {
    likeMap.set(like, like.length);
  }

  print("Like Map:", [...likeMap.entries()]);
  return likeMap;
};

 
const createProfileProxy = (data) => {
  return new Proxy(data, {
    get: (target, prop) => {
      return prop in target ? target[prop] : `No such property as '${prop}'`;
    },
    set: (target, prop, value) => {
      print(`Setting value '${value}' to property '${prop}'`);
      target[prop] = value;
      return true;
    }
  });
};

 
(async () => {
  const data = await fetchData();
  processLikes(data);

  const profile = createProfileProxy(data);
  print("Name:", profile.name);
  print("Country:", profile.country);  

  profile.age = 26;  
})();
