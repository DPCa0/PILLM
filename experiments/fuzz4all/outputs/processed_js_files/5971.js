 
class DataService {
  static fetchData(url) {
    return fetch(url).then(response => response.json());
  }
}

async function processUserData(url) {
  try {
    const userData = await DataService.fetchData(url);
    
     
    const { id, name, email, address: { city, geo: { lat, lng } } } = userData;

     
    const formatMessage = (strings, ...values) => strings.reduce((acc, str, index) => acc + str + (values[index] || ''), '');
    const message = formatMessage`User ${name} (ID: ${id}) lives in ${city}. Contact: ${email}. Coordinates: [${lat}, ${lng}].`;

    print(message);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

const userApi = 'https://jsonplaceholder.typicode.com/users/1';
processUserData(userApi);
