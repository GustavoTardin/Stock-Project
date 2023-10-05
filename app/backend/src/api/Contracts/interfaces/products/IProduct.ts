import ISizes from './ISizes';

export default interface IProduct {
  id?: number,
  category: string,
  model: string,
  buyPrice: number,
  salePrice: number,
  sizes: ISizes[]
}

// cueca thork - 10.99 x 599 = 
// calcinha - 4.99 x 80 = 

/* const babyDoll2 = {
  id: 1,
  category: 'Baby Doll', //Baby doll PV: 
  model: 'Pv',
  design: 'llama'
  size: 'gg'
  buyPrice: 20.99,
  salePrice: 30.99,
  totalQuantity: 5000
  low: 5 
};

const newDesign = {
  name: 'llama'
  pic: foto,
  designs
}

const updatedProducts = [...products, newDesign]

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