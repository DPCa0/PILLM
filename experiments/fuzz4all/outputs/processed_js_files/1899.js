 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
}

 
const handler = {
  get: (target, prop) => prop in target ? target[prop] : 'N/A'
};

 
async function processUserData(userId) {
  try {
    const user = await fetchData(`https: 
    const userProxy = new Proxy(user, handler);

    print(`Name: ${userProxy.name}`);
    print(`Email: ${userProxy.email}`);
    print(`Phone: ${userProxy.phone}`);
    print(`Company: ${userProxy.company.name}`);
    print(`Website: ${userProxy.website || 'No website provided'}`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

 
(async () => {
  for (let i = 1; i <= 3; i++) {
    await processUserData(i);
  }
})();
