 
const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property "${prop}" with value "${target[prop]}"`);
      return target[prop];
    }
    print(`Property "${prop}" does not exist`);
    return undefined;
  },
};

 
(async () => {
  const url = `https: 
  const data = await fetchData(url);
  
  const { name, owner: { login } } = data;
  print(`Project: ${name}, Owner: ${login}`);
  
  const projectInfo = new Proxy(data, handler);
  print(projectInfo.name);
  print(projectInfo.nonExistentProp);

   
  const { default: axios } = await import('https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js');
  const axiosData = await axios.get(url);
  print(`Fetched with axios: ${axiosData.data.name}`);
})();
