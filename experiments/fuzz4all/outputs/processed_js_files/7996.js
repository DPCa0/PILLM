 

 
const fetchData = () => new Promise(resolve => setTimeout(() => {
  resolve({ userId: 1, name: 'John Doe', age: 30, hobbies: ['reading', 'gaming'] });
}, 1000));

class User {
  constructor({ userId, name, age, hobbies }) {
    this.userId = userId;
    this.name = name;
    this.age = age;
    this.hobbies = hobbies;
  }

  get profile() {
    return `Name: ${this.name}, Age: ${this.age}, Hobbies: ${this.hobbies.join(', ')}`;
  }

  async updateProfile(newData) {
    try {
      const updatedData = await mockApiCall(this.userId, newData);
      Object.assign(this, updatedData);
      print('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }
}

 
const mockApiCall = (userId, data) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (userId === 1) {
      resolve({ ...data });
    } else {
      reject('User not found');
    }
  }, 500);
});

(async () => {
  const rawUserData = await fetchData();
  const { userId, ...userDetails } = rawUserData;   
  
  const user = new User({ userId, ...userDetails });
  print(user.profile);

  await user.updateProfile({ age: 31, hobbies: [...user.hobbies, 'coding'] });

  print(user.profile);
})();
