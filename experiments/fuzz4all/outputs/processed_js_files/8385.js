const crypto = require('crypto');

class AsyncChain {
  constructor(initialValue) {
    this.promise = Promise.resolve(initialValue);
  }

  then(fn) {
    this.promise = this.promise.then(fn);
    return this;
  }

  catch(fn) {
    this.promise = this.promise.catch(fn);
    return this;
  }

  async execute() {
    return this.promise;
  }
}

const randomString = (length) =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err, buffer) => {
      if (err) reject(err);
      resolve(buffer.toString('hex'));
    });
  });

const complexObjectManipulator = (obj) => {
  obj.transformed = true;
  obj.data = obj.data.split('').reverse().join('');
  return obj;
};

(async function main() {
  const data = { data: 'Advanced JavaScript' };

  const result = await new AsyncChain(data)
    .then(complexObjectManipulator)
    .then((obj) => {
      obj.hash = crypto.createHash('sha256').update(obj.data).digest('hex');
      return obj;
    })
    .then((obj) => randomString(16).then((randomStr) => ({ ...obj, randomStr })))
    .then((obj) => ({ ...obj, additionalInfo: 'All operations completed successfully!' }))
    .catch((err) => {
      console.error('An error occurred:', err);
      return null;
    })
    .execute();

  print(result);
})();
