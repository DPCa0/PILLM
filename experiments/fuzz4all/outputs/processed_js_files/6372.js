const fetch = require('node-fetch');

(async function complexFeatureDemo() {
  try {
     
    const response = await fetch('https://api.github.com/repos/nodejs/node');
    const repoDetails = await response.json();

     
    const { full_name, description, stargazers_count } = repoDetails;
    print(`Repository: ${full_name}\nDescription: ${description}\nStars: ${stargazers_count}`);

     
    const contributorsResponse = await fetch('https://api.github.com/repos/nodejs/node/contributors');
    const contributors = await contributorsResponse.json();
    
    const topContributors = new Map(
      contributors
        .slice(0, 5)
        .map(({ login, contributions }) => [login, contributions])
    );

     
    print("\nTop 5 Contributors:");
    for (const [login, contributions] of topContributors) {
      print(`- ${login}: ${contributions} contributions`);
    }

     
    const repoProxy = new Proxy(repoDetails, {
      get(target, prop) {
        print(`Accessed property "${prop}" with value: ${target[prop]}`);
        return Reflect.get(target, prop);
      }
    });

     
    print(`Repo URL: ${repoProxy.html_url}`);
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
This code demonstrates advanced JavaScript features such as async/await, destructuring, template literals, Maps, higher-order functions, proxies, and enhanced object literals.