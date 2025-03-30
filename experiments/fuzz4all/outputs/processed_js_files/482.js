 
import fetch from 'node-fetch';

 
(async () => {
  try {
     
    const { results } = await fetch('https://randomuser.me/api/')
      .then(response => response.json());

    const user = results[0];
    const { name: { first, last }, location: { city, country }, email } = user;

     
    const userProxy = new Proxy(user, {
      get(target, prop, receiver) {
        print(`Accessed property: ${prop}`);
        return Reflect.get(target, prop, receiver);
      }
    });

     
    const phone = userProxy?.phone ?? 'Phone number not available';

     
    function highlight(strings, ...values) {
      return strings.reduce((result, str, i) => `${result}${str}<b>${values[i] || ''}</b>`, '');
    }

    console.log(highlight`Name: ${first} ${last}
    Location: ${city}, ${country}
    Email: ${email}
    Phone: ${phone}`);

     
    async function* fetchUsers(count) {
      for (let i = 0; i < count; i++) {
        const res = await fetch('https://randomuser.me/api/');
        const { results: userBatch } = await res.json();
        yield userBatch[0];
      }
    }

    print('Fetching more users:');
    for await (const user of fetchUsers(3)) {
      print(`${user.name.first} ${user.name.last} from ${user.location.city}, ${user.location.country}`);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
