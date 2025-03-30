 
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  getDetails() {
    return `Product: ${this.name}, Price: $${this.price}`;
  }
}

async function fetchProductData() {
   
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        new Product('Laptop', 1500),
        new Product('Smartphone', 800),
        new Product('Tablet', 450)
      ]);
    }, 2000);
  });
}

function applyDiscount(products, discount) {
  return products.map(product => ({
    ...product,
    price: product.price - (product.price * (discount / 100))
  }));
}

(async function() {
  try {
    print('Fetching product data...');
    const products = await fetchProductData();
    print('Products fetched:', products.map(p => p.getDetails()));

    const discount = 10;  
    print(`Applying ${discount}% discount...`);
    const discountedProducts = applyDiscount(products, discount);
    print('Discounted Products:', discountedProducts.map(p => p.getDetails()));
  } catch (error) {
    console.error('Error fetching products:', error);
  }
})();
