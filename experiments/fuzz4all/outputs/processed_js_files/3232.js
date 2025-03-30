 
(async function() {
  const fs = await import('fs/promises');
  
   
  try {
    let data = await fs.readFile('data.json', 'utf8');
    let json = JSON.parse(data);
    
     
    let { title, ...otherProps } = json;
    
     
    let validator = {
      set: function(target, key, value) {
        if (key === 'count' && typeof value !== 'number') {
          throw new TypeError('Count must be a number');
        }
        target[key] = value;
        return true;
      }
    };
    
    let proxyObj = new Proxy(otherProps, validator);

     
    class Item {
      static [Symbol.for('description')] = 'Item class with a private description field';
      #privateDescription;

      constructor(description) {
        this.#privateDescription = description;
      }

      getDescription() {
        return this.#privateDescription;
      }
      
      static getDescriptionSymbol() {
        return this[Symbol.for('description')];
      }
    }

     
    function customTemplate(strings, ...expressions) {
      return strings.reduce((acc, str, index) => acc + str + (expressions[index] || ''), '');
    }

    proxyObj.title = title;
    proxyObj.count = 42;

    const item = new Item('This is a private description.');

    print(customTemplate`Title: ${proxyObj.title}, Count: ${proxyObj.count}`);
    print(`Item Description: ${item.getDescription()}`);
    print(`Class Description: ${Item.getDescriptionSymbol()}`);

  } catch (error) {
    console.error('Error reading file:', error);
  }
})();
