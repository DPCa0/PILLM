 
async function fetchUserData(userId) {
  const API_URL = `https: 

  try {
     
    let response = await fetch(API_URL);

    if (!response.ok) throw new Error("Network response was not ok");

    let userData = await response.json();

     
    const { name, email, address: { street, city }, company: { name: companyName } } = userData;

     
    function userDetails(strings, ...values) {
      return strings.reduce((result, string, i) => {
        return `${result}${string}<b>${values[i] || ''}</b>`;
      }, '');
    }

     
    print(userDetails`User: ${name}\nEmail: ${email}\nAddress: ${street}, ${city}\nCompany: ${companyName}`);

     
    await new Promise(resolve => setTimeout(resolve, 2000));

     
    const phones = ['123-456-7890', '987-654-3210'];

    let formattedPhones = phones.map(phone => phone.split('-').join(' '));
    print('Formatted Phone Numbers:', formattedPhones);

     
    let allPhones = phones.reduce((acc, phone) => `${acc}, ${phone}`, 'Phones:');
    print(allPhones);

  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
const user = { id: 1, name: 'Jane Doe' };

const userProxy = new Proxy(user, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      print(`Property "${prop}" does not exist on the user object`);
      return undefined;
    }
  }
});

print(userProxy.name);  
print(userProxy.age);  

 
fetchUserData(userProxy.id);

