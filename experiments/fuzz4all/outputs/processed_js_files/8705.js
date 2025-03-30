 
async function* fetchUserData(userIds) {
  for (const id of userIds) {
    yield new Promise((resolve) =>
      setTimeout(() => resolve({ id, name: `User${id}` }), 1000)
    );
  }
}

 
const userProxyHandler = {
  get(target, property) {
    print(`Accessing property '${property}'`);
    return target[property];
  },
};

 
const userCache = new Map();

(async () => {
  const userIds = [1, 2, 3, 4, 5];

   
  for await (const userPromise of fetchUserData(userIds)) {
    const user = await userPromise;
    userCache.set(user.id, new Proxy(user, userProxyHandler));
  }

   
  const [firstUserId, ...otherUserIds] = userIds;

   
  print(`First user: ${userCache.get(firstUserId)?.name ?? 'Unknown'}`);

   
  const clonedUser = { ...userCache.get(otherUserIds[0]), age: 25 };
  print(`Cloned user: ${clonedUser.name}, Age: ${clonedUser.age}`);

   
  const userNames = await Promise.all(
    otherUserIds.map(async (id) => userCache.get(id)?.name ?? 'Unknown')
  );

  print('Other users:', userNames.join(', '));
})();
