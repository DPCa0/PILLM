 
const fetchUserData = async (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: `User${userId}`, role: 'Member' });
      } else {
        reject('Invalid User ID');
      }
    }, 1000);
  });
};

 
function* userFlow() {
  try {
    const user = yield fetchUserData(1);
    print(`Fetched User: ${user.name}`);
    user.role = 'Admin';
    yield Promise.resolve(print(`Updated User Role to: ${user.role}`));
    yield Promise.resolve(print('User Flow Completed'));
  } catch (error) {
    console.error('Error in user flow:', error);
  }
}

 
const runUserFlow = async (gen) => {
  const it = gen();
  const advance = async (result) => {
    if (result.done) return;
    try {
      advance(await it.next(await result.value));
    } catch (error) {
      it.throw(error);
    }
  };
  advance(it.next());
};

 
runUserFlow(userFlow);
