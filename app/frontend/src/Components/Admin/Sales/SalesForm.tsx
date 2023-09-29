import React, { useState } from 'react';

interface Product {
  productName: string;
  productPrice: number;
  productCost: number;
  productQuantity: number;
}

function SalesForm() {
  const [products, setProducts] = useState<Product[]>([
    {
      productName: '',
      productPrice: 0,
      productCost: 0,
      productQuantity: 0,
    },
  ]);

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        productName: '',
        productPrice: 0,
        productCost: 0,
        productQuantity: 0,
      },
    ]);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value } = e.target;
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [name]: name === 'productName' ? value : parseFloat(value),
    };
    setProducts(updatedProducts);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui, você pode enviar os dados do resumo de vendas para onde precisar (por exemplo, para o servidor).
    console.log('Dados do resumo de vendas:', products);
  };

  return (
    <form onSubmit={ handleSubmit } style={ { color: 'white' } }>
      <label htmlFor="month">
        <input type="text" id="month" />
      </label>
      {products.map((product, index) => (
        <div key={ index }>
          <label>Nome do Produto:</label>
          <input
            type="text"
            name="productName"
            value={ product.productName }
            onChange={ (e) => handleInputChange(e, index) }
            required
          />
          <label>Valor de Venda:</label>
          <input
            type="number"
            name="productPrice"
            step="0.01"
            value={ product.productPrice }
            onChange={ (e) => handleInputChange(e, index) }
            required
          />
          <label>Valor de Compra:</label>
          <input
            type="number"
            name="productCost"
            step="0.01"
            value={ product.productCost }
            onChange={ (e) => handleInputChange(e, index) }
            required
          />
          <label>Quantidade Vendida:</label>
          <input
            type="number"
            name="productQuantity"
            value={ product.productQuantity }
            onChange={ (e) => handleInputChange(e, index) }
            required
          />
        </div>
      ))}
      <button type="button" onClick={ handleAddProduct }>
        Adicionar Produto
      </button>
      <button type="submit">Enviar Resumo de Vendas</button>
    </form>

  );
}

export default SalesForm;
