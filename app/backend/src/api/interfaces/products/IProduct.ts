import ISizes from './ISizes';

export default interface IProduct {
  id?: number,
  category: string,
  model: string,
  buyPrice: number,
  salePrice: number,
  sizes: ISizes[]
}

/* const babyDoll2 = {
  id: 1,
  category: 'Baby Doll',
  model: 'Pv',
  buyPrice: 20.99,
  salePrice: 30.99,
  designs: [
    { name: 'Llama',
      sizes: [
        { size: 'GG', quantity: 30, low: 5 },
        { size: 'G', quantity: 10, low: 10 },
        { size: 'M', quantity: 10, low: 10 },
        { size: 'P', quantity: 5, low: 0 },
      ] },
    {
      name: 'Vasco',
      sizes: [
        { size: 'GG', quantity: 30, low: 5 },
        { size: 'G', quantity: 10, low: 10 },
        { size: 'M', quantity: 10, low: 10 },
        { size: 'P', quantity: 5, low: 0 },
      ] },
  ],
};

const babyDoll: IProduct = {
  id: 1,
  category: 'Baby Doll',
  model: 'Pv',
  buyPrice: 20.99,
  salePrice: 30.99,
  sizes: [
    {
      size: 'GG',
      designs: [
        {
          name: 'LLama',
          quantity: 40,
          alertStock: 5,
        },
        {
          name: 'Mulher maravilha',
          quantity: 40,
          alertStock: 5,
        },
        {
          name: 'Snoopy',
          quantity: 60,
          alertStock: 10,
        },
      ],
    },
    {
      size: 'G',
      designs: [
        {
          name: 'LLama',
          quantity: 40,
          alertStock: 5,
        },
        {
          name: 'Mulher maravilha',
          quantity: 40,
          alertStock: 5,
        },
        {
          name: 'Snoopy',
          quantity: 60,
          alertStock: 10,
        },
      ],
    },
    {
      size: 'M',
      designs: [
        {
          name: 'LLama',
          quantity: 40,
          alertStock: 5,
        },
        {
          name: 'Mulher maravilha',
          quantity: 40,
          alertStock: 5,
        },
        {
          name: 'Snoopy',
          quantity: 60,
          alertStock: 10,
        },
      ],
    },
    {
      size: 'P',
      designs: [
        {
          name: 'LLama',
          quantity: 40,
          alertStock: 5,
        },
        {
          name: 'Mulher maravilha',
          quantity: 40,
          alertStock: 5,
        },
        {
          name: 'Snoopy',
          quantity: 60,
          alertStock: 10,
        },
      ],
    },
  ],
};

const thork: IProduct = {
  id: 2,
  category: 'Cueca',
  model: 'Box Thork',
  buyPrice: 9.99,
  salePrice: 13.50,
  sizes: [
    {
      size: 'GG',
      designs: [
        {
          name: 'Verde',
          quantity: 30,
          alertStock: 0,
        },
        {
          name: 'Vermelho',
          quantity: 20,
          alertStock: 0,
        },
        {
          name: 'Azul marinho',
          quantity: 20,
          alertStock: 0,
        },
      ],
    },
    {
      size: 'G',
      designs: [
        {
          name: 'Verde',
          quantity: 30,
          alertStock: 0,
        },
        {
          name: 'Vermelho',
          quantity: 20,
          alertStock: 0,
        },
        {
          name: 'Azul marinho',
          quantity: 20,
          alertStock: 0,
        },
      ],
    },
    {
      size: 'M',
      designs: [
        {
          name: 'Verde',
          quantity: 30,
          alertStock: 0,
        },
        {
          name: 'Vermelho',
          quantity: 20,
          alertStock: 0,
        },
        {
          name: 'Azul marinho',
          quantity: 20,
          alertStock: 0,
        },
      ],
    },
    {
      size: 'P',
      designs: [
        {
          name: 'Verde',
          quantity: 30,
          alertStock: 0,
        },
        {
          name: 'Vermelho',
          quantity: 20,
          alertStock: 0,
        },
        {
          name: 'Azul marinho',
          quantity: 20,
          alertStock: 0,
        },
      ],
    },
  ],
};
*/