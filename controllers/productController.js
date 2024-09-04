
let products = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 150 }
];

const getProducts = (req, res) => {
  res.json(products);
};

const createProduct = (req, res) => {
  const { name, price } = req.body;
  const newProduct = { id: products.length + 1, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const product = products.find(p => p.id === parseInt(id));

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

const deleteProduct = (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    products.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
