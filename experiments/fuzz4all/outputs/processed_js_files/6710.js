 
async function fetchData(url) {
     
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
class Product {
    constructor(name, price) {
        this._name = name;
        this._price = price;
    }
    
    get price() {
        return this._price;
    }

    set price(value) {
        if (value < 0) {
            throw new Error('Price cannot be negative');
        }
        this._price = value;
    }
    
    static discountedPrice(product, discount) {
        return product.price * (1 - discount);
    }
}

 
const productHandler = {
    set(target, property, value) {
        if (property === 'price' && value < 0) {
            console.warn('Negative price not allowed');
            return false;
        }
        target[property] = value;
        return true;
    }
};

const myProduct = new Product('Laptop', 1200);
const proxiedProduct = new Proxy(myProduct, productHandler);

proxiedProduct.price = 1000;  
proxiedProduct.price = -200;  

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const generateId = idGenerator();

 
(async function main() {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    const postData = await fetchData(url);
    print('Fetched Data:', postData);

    print('Product Price:', proxiedProduct.price);
    print('Discounted Price:', Product.discountedPrice(proxiedProduct, 0.1));

    print('Generated IDs:', generateId.next().value, generateId.next().value, generateId.next().value);
})();
