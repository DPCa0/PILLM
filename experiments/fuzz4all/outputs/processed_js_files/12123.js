 
(async () => {
  const { promises: fs } = await import('fs');
  const { createHash } = await import('crypto');

   
  const readJsonFile = async (filePath) => {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  };

  const writeJsonFile = async (filePath, data) => {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonData);
  };

   
  const observedObject = (obj) => {
    return new Proxy(obj, {
      set(target, prop, value) {
        print(`Property ${prop} set to ${value}`);
        target[prop] = value;
        return true;
      },
    });
  };

   
  function* hashGenerator(input) {
    for (let i = 0; i < input.length; i++) {
      const hash = createHash('sha256').update(input[i]).digest('hex');
      yield hash;
    }
  }

   
  const hashTag = (strings, ...values) =>
    strings.raw.reduce(
      (acc, str, idx) => acc + str + (values[idx] ? `#${values[idx]}` : ''),
      ''
    );

   
  const main = async () => {
    try {
      const filePath = './data.json';
      
      const data = { greeting: 'Hello', target: 'world' };
      await writeJsonFile(filePath, data);

      const fileContent = await readJsonFile(filePath);
      print('File content:', fileContent);

      const observedData = observedObject(fileContent);
      observedData.newProperty = 'New Value';

      const inputs = ['foo', 'bar', 'baz'];
      const generator = hashGenerator(inputs);

      for (const hash of generator) {
        print('Generated hash:', hash);
      }

      const taggedMessage = hashTag`Message: ${'file'} processed with ${'hashes'}`;
      print(taggedMessage);
      
    } catch (err)